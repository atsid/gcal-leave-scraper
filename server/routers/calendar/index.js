const jefferson = require('express-jefferson');
const calendar = require('../../middleware/calendar');

const router = jefferson.router({
  routes: {
    '/all': {
      get: [calendar.listAllCalendars],
    },
  },
});

module.exports = router;
