const debug = require('debug')('app:stores:Groups');
const request = require('superagent-bluebird-promise');

/**
 * A data store for Projects
 */
class GroupsStore {
  constructor() {
    this.state = {
      groups: null,
      contacts: {},
      groupsPromise: null,
      groupContactsPromise: {},
    };
  }

  getGroups() {
    let promise;
    if (this.state.groups) {
      promise = Promise.resolve(this.state.groups.result);
    } else if (this.state.groupsPromise) {
      promise = this.state.groupsPromise;
    } else {
      promise = this.state.groupsPromise = request.get('/api/groups/all')
        .then((res) => {
          debug('groups: ', res.body);
          this.state.groups = {result: res.body};
          return res.body;
        })
        .catch((err) => {
          debug('error getting groups', err);
          this.state.groups = {result: null};
          return null;
        });
    }
    return promise;
  }

  getGroupContacts(groupId) {
    let promise;
    if (this.state.contacts && this.state.contacts[groupId]) {
      promise = Promise.resolve(this.state.contacts[groupId].result);
    } else if (this.state.groupContactsPromise && this.state.groupContactsPromise[groupId]) {
      promise = this.state.groupContactsPromise[groupId];
    } else {
      promise = this.state.groupContactsPromise[groupId] = request.get('/api/groups/contacts/all')
        .query({ groupId: groupId })
        .then((res) => {
          debug('group contacts: ', res.body);
          this.state.contacts[groupId] = {result: res.body};
          return res.body;
        })
        .catch((err) => {
          debug('error getting group contacts', err);
          this.state.contacts[groupId] = null;
          return null;
        });
    }
    return promise;
  }
}

module.exports = GroupsStore;
