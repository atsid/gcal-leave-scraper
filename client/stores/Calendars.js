const debug = require('debug')('app:stores:Calendars');
const request = require('superagent-bluebird-promise');

/**
 * A data store for Projects
 */
class CalendarsStore {
  constructor() {
    this.state = {
      calendars: null,
      events: {},
      calendarsPromise: null,
      calendarEventsPromise: {},
    };
  }

  getCalendars() {
    let promise;
    if (this.state.calendars) {
      promise = Promise.resolve(this.state.calendars.result);
    } else if (this.state.calendarsPromise) {
      promise = this.state.calendarsPromise;
    } else {
      promise = this.state.calendarsPromise = request.get('/api/calendar/all')
        .then((res) => {
          debug('calendars: ', res.body);
          this.state.calendars = {result: res.body};
          return res.body;
        })
        .catch((err) => {
          debug('error getting calendars', err);
          this.state.calendars = {result: null};
          return null;
        });
    }
    return promise;
  }

  getBulkCalendarEvents(userId, calendars, filter) {
    const promises = [];
    console.log('> Filter: ', filter);
    console.log('> Calendars: ', calendars);
    promises.push(this.getCalendarEvents(userId));
    for (let index = 0; index < calendars.length; index++) {
      const calendar = calendars[index];
      if (calendar.id !== userId) {
        promises.push(this.getCalendarEvents(calendar.id));
      }
    }
    return Promise.all(promises);
  }

  getCalendarEvents(calendarId) {
    let promise;
    if (this.state.events && this.state.events[calendarId]) {
      promise = Promise.resolve(this.state.events[calendarId].result);
    } else if (this.state.calendarEventsPromise && this.state.calendarEventsPromise[calendarId]) {
      promise = this.state.calendarEventsPromise[calendarId];
    } else {
      promise = this.state.calendarEventsPromise[calendarId] = request.get('/api/calendar/events/all')
        .query({ calendarId: calendarId })
        .then((res) => {
          debug('calendar events: ', res.body);
          this.state.events[calendarId] = {result: res.body};
          return res.body;
        })
        .catch((err) => {
          debug('error getting calendar events', err);
          this.state.events[calendarId] = {result: null};
          return null;
        });
    }
    return promise;
  }
}

module.exports = CalendarsStore;
