const jefferson = require('express-jefferson');
const events = require('../../middleware/events');

const router = jefferson.router({
  routes: {
    '/listEvents': {
      get: [events.listEvents],
    },
  },
});

module.exports = router;
