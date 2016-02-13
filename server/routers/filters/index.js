const jefferson = require('express-jefferson');
const filter = require('../../middleware/filter');

const router = jefferson.router({
  routes: {
    '/all': {
      get: [filter.listAllFilters],
    },
  },
});

module.exports = router;
