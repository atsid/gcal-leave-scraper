const UserStore = require('./UserStore');
const Contacts = require('./Contacts');
const Calendars = require('./Calendars');

const users = new UserStore();
const contacts = new Contacts();
const calendars = new Calendars();

module.exports = {
  users,
  contacts,
  calendars,
};
