const NotAuthorizedError = require('../../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  if (!req.user) {
    throw new NotAuthorizedError('User must be logged in');
  }

  next();
};
