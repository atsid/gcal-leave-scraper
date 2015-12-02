const jefferson = require('express-jefferson');
const events = require('../../middleware/events');

const router = jefferson.router({
  routes: {
    "/listAllEvents": {
      get: [events.listAllEvents],
    },
  },
});

module.exports = router;
