const debug = require('debug')('app:stores:Contacts');
const request = require('superagent-bluebird-promise');

/**
 * A data store for Projects
 */
class ContactsStore {
  constructor() {
    this.state = {
      contacts: null,
      contactsPromise: null,
    };
  }

  getContacts() {
    let promise;
    if (this.state.contacts) {
      promise = Promise.resolve(this.state.contacts.result);
    } else if (this.state.contactsPromise) {
      promise = this.state.contactsPromise;
    } else {
      promise = this.state.contactsPromise = request.get('/api/contacts/all')
        .then((res) => {
          debug('contacts: ', res.body);
          this.state.contacts = {result: res.body};
          return res.body;
        })
        .catch((err) => {
          debug('error getting contacts', err);
          this.state.contacts = {result: null};
          return null;
        });
    }
    return promise;
  }
}

module.exports = ContactsStore;
