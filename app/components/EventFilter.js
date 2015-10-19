const Promise = require('bluebird');

class EventFilter {
  constructor(filters = []) {
    this._filters = [...filters];
  }

  /**
   * Addsd a filter to the end of the list of filters.
   * @param filter Filter to append
   */
  addFilter(filter) {
    this._filters.push(filter);
  }

  clearFilters() {
    this._filters = [];
  }

  _applyFilter(filter, events) {
    const unfiltered = [];

    events.forEach((event) => {
      if (filter(event)) {
        unfiltered.push(event);
      }
    });

    return unfiltered;
  }

  /**
   * Applies filters in-order to the list of events.
   * @param events List of events
   * @returns {bluebird|exports|module.exports}
   */
  apply(events) {
    let preFilter = events;
    let postFilter = [];

    return new Promise((resolve) => {
      if (this._filters.length > 0) {
        this._filters.forEach((filter) => {
          postFilter = this._applyFilter(filter, preFilter);

          // reset pre-filter state for next filter
          preFilter = postFilter;
        });

        resolve(postFilter);
      } else {
        resolve(events);
      }
    });
  }

  /**
   * Returns the current list of filters to be applied.
   * @returns {Array}
   */
  getFilters() {
    return this._filters;
  }
}

module.exports = EventFilter;
