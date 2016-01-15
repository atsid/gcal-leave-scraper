const jefferson = require('express-jefferson');
const calendar = require('../../middleware/calendar');

const router = jefferson.router({
  routes: {
    '/all': {
      get: [calendar.listAllCalendars],
    },
    '/events/all': {
      get: [calendar.listAllCalendarEvents],
    },
  },
});

module.exports = router;
