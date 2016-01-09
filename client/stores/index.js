const UserStore = require('./UserStore');
const Contacts = require('./Contacts');

const users = new UserStore();
const contacts = new Contacts();

module.exports = {
  users,
  contacts,
};
