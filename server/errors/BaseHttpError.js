class BaseHttpError extends Error {
  constructor(message, httpStatus) {
    super();
    this.message = message;
    this.httpStatus = httpStatus;
  }
}

module.exports = BaseHttpError;
