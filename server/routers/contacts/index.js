const jefferson = require('express-jefferson');
const contacts = require('../../middleware/contacts');

const router = jefferson.router({
  routes: {
    '/all': {
      get: [contacts.listAllContacts],
    },
  },
});

module.exports = router;
