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

  _getBuildCalenarEvents(userId, calendars) {
    const promises = [];
    // Get users calendar along with all calendars of the logged in user
    promises.push(this.getCalendarEvents(userId));
    for (let index = 0; index < calendars.length; index++) {
      const calendar = calendars[index];
      // Exclude shared calendar of the logged in user, did prior
      // Exclude any id that starts with #, was causing issues
      if (calendar.id !== userId && !calendar.id.startsWith('#')) {
        promises.push(this.getCalendarEvents(calendar.id));
      }
    }
    return promises;
  }

  _stringContainsFromList(string, filterString) {
    const filters = filterString.split(',');
    let match = false;
    if (string) {
      for (let index = 0; index < filters.length; index++) {
        if (string.toLowerCase().indexOf(filters[index].toLowerCase()) >= 0) {
          match = true;
        }
      }
    }
    return match;
  }

  _filterBuildCalenarEvents(userId, events, filter) {
    const results = [];
    for (let index = 0; index < events.length; index++) {
      if (events[index].creator && events[index].creator.email === userId) {
        if (this._stringContainsFromList(events[index].summary, filter) || this._stringContainsFromList(events[index].title, filter)) {
          results.push(events[index]);
        }
      }
    }
    return results;
  }

  _extractEvents(events) {
    let resultEvents = [];
    for (let index = 0; index < events.length; index++) {
      if (events[index].items) {
        resultEvents = resultEvents.concat(events[index].items);
      }
    }
    return resultEvents;
  }

  getBulkCalendarEvents(userId, calendars, filter) {
    const returnPromise = new Promise((resolve, reject) => {
      const promises = this._getBuildCalenarEvents(userId, calendars);
      // When change of service calls all resolved then filter results and resolve returned promise
      Promise.all(promises).then((events) => {
        resolve(this._filterBuildCalenarEvents(userId, this._extractEvents(events), filter));
      })
      .then(err => {
        reject(err);
      });
    });
    return returnPromise;
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
          this.state.events[calendarId] = null;
          return null;
        });
    }
    return promise;
  }
}

module.exports = CalendarsStore;
