const UserStore = require('./UserStore');
const Contacts = require('./Contacts');
const Calendars = require('./Calendars');
const Groups = require('./Groups');
const Filters = require('./Filters');

const users = new UserStore();
const contacts = new Contacts();
const calendars = new Calendars();
const groups = new Groups();
const filters = new Filters();

module.exports = {
  users,
  contacts,
  calendars,
  groups,
  filters,
};
