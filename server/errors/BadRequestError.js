const BaseHttpError = require('./BaseHttpError');

class BadRequestError extends BaseHttpError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestError;
