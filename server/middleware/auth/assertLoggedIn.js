const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const debug = require('debug')('app:middleware:auth:assertLoggedIn');

module.exports = (req, res, next) => {
  if (!req.user) {
    throw new NotAuthorizedError('User must be logged in');
  }

  debug('user %s is logged in', req.user);
  next();
};
