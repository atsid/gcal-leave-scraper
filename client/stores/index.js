const UserStore = require('./UserStore');
const Contacts = require('./Contacts');
const Calendars = require('./Calendars');
const Groups = require('./Groups');

const users = new UserStore();
const contacts = new Contacts();
const calendars = new Calendars();
const groups = new Groups();

module.exports = {
  users,
  contacts,
  calendars,
  groups,
};
