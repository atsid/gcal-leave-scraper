const jefferson = require('express-jefferson');
const events = require('../../middleware/events');

const router = jefferson.router({
  routes: {
    '/listAllEvents': {
      get: [events.listAllEvents],
    },
    '/listEventsForMonth/:year/:month': {
      get: [events.listEventsForMonth],
    },
    '/summary': {
      post: [events.summary],
    },
  },
});

module.exports = router;
