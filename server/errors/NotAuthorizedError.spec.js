const { expect } = require('chai');
const NotAuthorizedError = require('./NotAuthorizedError');

describe('The NotAuthorizedError', () => {
  describe('constructor', () => {
    it('should set message and httpStatus', () => {
      const error = new NotAuthorizedError('oops');

      expect(error.message).to.equal('oops');
      expect(error.httpStatus).to.equal(401);
    });
  });
});
