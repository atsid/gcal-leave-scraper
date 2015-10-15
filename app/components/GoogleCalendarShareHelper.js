const calendar = require('googleapis').calendar('v3');
const debug = require('debug')('app:GoogleCalendarShareHelper');
const Promise = require('bluebird');
const getCalendarList = Promise.promisify(calendar.calendarList.list);
const addUserCalendar = Promise.promisify(calendar.calendarList.insert);

function _getAllCalendars(existingUsers, lastResponse, auth) {
  if (!lastResponse || !lastResponse.syncToken) {
    return getCalendarList({
      'auth': auth,
      'maxResults': 250,
      'pageToken': lastResponse ? lastResponse.pageToken : null,
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
    return Promise.map(gmailUsers, gmailUser => {
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

module.exports = {ensureCalendarsAvailable};
