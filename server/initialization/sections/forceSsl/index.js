const middleware = require('./forceSsl');

module.exports = {
  name: 'ssl redirection',
  configure(app) {
    app.use(middleware);
  },
};
