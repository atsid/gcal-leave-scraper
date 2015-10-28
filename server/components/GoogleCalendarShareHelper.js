const calendar = require('googleapis').calendar('v3');
const debug = require('debug')('app:GoogleCalendarShareHelper');
const Promise = require('bluebird');
const getCalendarList = Promise.promisify(calendar.calendarList.list);
const addUserCalendar = Promise.promisify(calendar.calendarList.insert);
const getEventList = Promise.promisify(calendar.events.list);

function _getAllCalendars(existingUsers, lastResponse, auth) {
  if (!lastResponse || !lastResponse.nextSyncToken) {
    return getCalendarList({
      'auth': auth,
      'maxResults': 250,
      'pageToken': lastResponse ? lastResponse.nextPageToken : null,
    }).then((responseList) => {
      const cals = responseList[0].items;

      debug('adding to list of existing users');
      cals.map(item => {
        existingUsers.push(item.summary);
      });

      return _getAllCalendars(existingUsers, responseList[0], auth);
    });
  }
}

/**
 * Iterates through a list of GMail users and adds their calendar if it isn't already
 * available.
 *
 * @param gmailUsers List of GMail users to iterate through
 * @param auth OAuth provider
 * @returns {*|Promise.<T>}
 */
function ensureCalendarsAvailable(gmailUsers, auth) {
  const existingUsers = [];

  return _getAllCalendars(existingUsers, null, auth).then(() => {
    return Promise.map(gmailUsers, (gmailUser) => {
      const email = gmailUser.email;
      const userIndex = existingUsers.indexOf(email);

      if (userIndex < 0) {
        debug('user %s was not found, adding their calendar', email);
        addUserCalendar({
          'auth': auth,
          'resource': {
            'id': email,
            'hidden': false,
          },
        });
      }
    });
  });
}

/**
 * Helper method to recurse through all calendar event pages.
 * @param email
 * @param startingDate
 * @param endingDate
 * @param eventHandler
 * @param lastResponse
 * @param auth
 * @returns {*|Promise.<T>}
 * @private
 */
function _processAllEventsForUser(email, startingDate, endingDate, eventHandler, lastResponse, auth) {
  if (!lastResponse || !lastResponse.nextSyncToken) {
    return getEventList({
      'auth': auth,
      'timeMin': startingDate,
      'timeMax': endingDate,
      'showDeleted': true,
      'calendarId': email,
      'pageToken': lastResponse ? lastResponse.nextPageToken : null,
      'maxResults': 2500,
      'orderBy': 'updated',
    }).then((responseList) => {
      const events = responseList[0].items;

      return Promise.map(events, item => {
        return eventHandler(item);
      }).then(() => {
        return _processAllEventsForUser(email, startingDate, endingDate, eventHandler, responseList[0], auth);
      });
    });
  }

  return Promise.resolve();
}

/**
 * Iterate through events for specified calendar with specified constraints and calling the event handler
 * for each event encountered.
 *
 * @param email The email address/calendar to process events for
 * @param startingDate Starting date to filter events
 * @param endingDate Ending date to filter events
 * @param eventHandler Handler to call on each event
 * @param auth OAuth client
 * @returns {*|Promise.<T>}
 */
function processEventsForUser(email, startingDate, endingDate, eventHandler, auth) {
  if (email) {
    return _processAllEventsForUser(email, startingDate, endingDate, eventHandler, null, auth);
  }

  return Promise.resolve();
}

module.exports = {ensureCalendarsAvailable, processEventsForUser};
