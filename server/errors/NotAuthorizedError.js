const BaseHttpError = require('./BaseHttpError');

class NotAuthorizedError extends BaseHttpError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = NotAuthorizedError;
