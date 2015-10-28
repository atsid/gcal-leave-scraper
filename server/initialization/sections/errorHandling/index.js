const errorHandler = require('./errorHandler');

module.exports = {
  name: 'error handler',
  configure(app) {
    app.use(errorHandler);
  },
};
