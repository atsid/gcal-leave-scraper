const jefferson = require('express-jefferson');
const calendar = require('../../middleware/group');

const router = jefferson.router({
  routes: {
    '/all': {
      get: [calendar.listAllGroups],
    },
    '/contacts/all': {
      get: [calendar.listAllGroupContacts],
    },
  },
});

module.exports = router;
