const helper = require('./GoogleCalendarShareHelper');
const leaveEventTransformer = require('./leaveEventTransformer');
const filters = require('./filters');
const EventFilter = require('./EventFilter');
const eventFilter = new EventFilter([filters.allDayEventFilter, filters.leaveEventFilter]);
const Promise = require('bluebird');
const LeaveEvent = Promise.promisifyAll(require('../persistence/index').models.LeaveEvent);
const updateLeaveEvent = Promise.method((leaveEvent, leaveEventObj) => {
  // Handles updating of an event that already exists.
  leaveEventObj.status = leaveEvent.status;
  leaveEventObj.summary = leaveEvent.summary;
  leaveEventObj.startDate = leaveEvent.startDate;
  leaveEventObj.endDate = leaveEvent.endDate;

  return Promise.method(leaveEventObj.save)();
});
const removeLeaveEvent = Promise.method((leaveEventObj) => {
  // Handles removal of an event that exists but was cancelled/deleted.
  // Wrapping in a promise instead of using Promise.method due possible scoping bug in bluebird/mongoose.
  return new Promise((resolve) => {
    leaveEventObj.remove(() => {
      return resolve();
    });
  });
});
const saveLeaveEvent = Promise.method((leaveEvent) => {
  // Handles creation of a new event
  return Promise.method(leaveEvent.save)();
});

/**
 * Determines what operation to perform on the passed in event.
 *
 * @param leaveEvent Leave event to dispatch to correct handler
 * @returns {Promise.<T>|*}
 */
function checkSaveUpdateOrRemove(leaveEvent) {
  return LeaveEvent.findAsync({'id': leaveEvent.id}).then((leaveEventObj) => {
    if (leaveEventObj.length && leaveEvent.status !== 'cancelled') {
      // If leave event exists and isn't canceled, update it.
      return updateLeaveEvent(leaveEvent, leaveEventObj[0]);
    } else if (leaveEventObj.length && leaveEvent.status === 'cancelled') {
      // If leave event exists and it is canceled, remove it.
      return removeLeaveEvent(leaveEventObj[0]);
    } else if (leaveEvent.status !== 'cancelled') {
      // If leave event doesn't exist and it isn't canceled, save it.
      return saveLeaveEvent(leaveEvent);
    }
  });
}

/**
 * Handler to process each leave event.
 *
 * @param event Event to process
 * @returns {*}
 */
function calendarEventHandler(event) {
  return eventFilter.apply([event]).map((calLeaveEvent) => {
    return leaveEventTransformer(calLeaveEvent).then((leaveEvent) => {
      return leaveEvent;
    });
  }).map(checkSaveUpdateOrRemove);
}

/**
 * Iterates through a list of users and processes events in the specified date range.
 *
 * @param users List of users to process events on
 * @param startDate Starting date of events to search for
 * @param endDate Ending date of events to search for
 * @param auth Google OAuth client
 * @returns {Array}
 */
function scan(users, startDate, endDate, auth) {
  return Promise.map(users, (user) => {
    return helper.processEventsForUser(user.email, startDate, endDate, calendarEventHandler, auth);
  });
}

module.exports = {scan};