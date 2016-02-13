const debug = require('debug')('app:stores:Filters');
const request = require('superagent-bluebird-promise');

/**
 * A data store for Projects
 */
class FiltersStore {
  constructor() {
    this.state = {
      filters: null,
      filtersPromise: null,
    };
  }

  getFilters() {
    let promise;
    if (this.state.filters) {
      promise = Promise.resolve(this.state.filters.result);
    } else if (this.state.filtersPromis) {
      promise = this.state.filtersPromis;
    } else {
      promise = this.state.filtersPromis = request.get('/api/filters/all')
        .then((res) => {
          debug('filters: ', res.body);
          this.state.filters = {result: res.body};
          return res.body;
        })
        .catch((err) => {
          debug('error getting filters', err);
          this.state.filters = {result: null};
          return null;
        });
    }
    return promise;
  }
}

module.exports = FiltersStore;
