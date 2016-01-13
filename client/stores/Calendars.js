const debug = require('debug')('app:stores:Calendars');
const request = require('superagent-bluebird-promise');

/**
 * A data store for Projects
 */
class CalendarsStore {
  constructor() {
    this.state = {
      calendars: null,
      calendarsPromise: null,
    };
  }

  // TODO: Add user as argument
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
}

module.exports = CalendarsStore;
