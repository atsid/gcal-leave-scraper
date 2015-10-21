const helper = require('./GoogleCalendarShareHelper');
const leaveEventTransformer = require('./leaveEventTransformer');
const filters = require('./filters');
const EventFilter = require('./EventFilter');
const eventFilter = new EventFilter([filters.allDayEventFilter, filters.leaveEventFilter]);
const Promise = require('bluebird');
const LeaveEvent = Promise.promisifyAll(require('../persistence').models.LeaveEvent);
const updateLeaveEvent = Promise.method((leaveEvent, leaveEventObj) => {
  leaveEventObj.status = leaveEvent.status;
  leaveEventObj.summary = leaveEvent.summary;
  leaveEventObj.startDate = leaveEvent.startDate;
  leaveEventObj.endDate = leaveEvent.endDate;

  return Promise.method(leaveEventObj.save)();
});
const removeLeaveEvent = Promise.method((leaveEventObj) => {
  return new Promise((resolve) => {
    leaveEventObj.remove(() => {
      return resolve();
    });
  });
});
const saveLeaveEvent = Promise.method((leaveEvent) => {
  return Promise.method(leaveEvent.save)();
});

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

function calendarEventHandler(event) {
  return eventFilter.apply([event]).map((calLeaveEvent) => {
    return leaveEventTransformer(calLeaveEvent).then((leaveEvent) => {
      return leaveEvent;
    });
  }).map(checkSaveUpdateOrRemove);
}

function scan(users, startDate, endDate, auth) {
  return Promise.map(users, (user) => {
    return helper.processEventsForUser(user.email, startDate, endDate, calendarEventHandler, auth);
  });
}

module.exports = {scan};
