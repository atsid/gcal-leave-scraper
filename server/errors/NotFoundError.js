const BaseHttpError = require('./BaseHttpError');

class NotFoundError extends BaseHttpError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;
