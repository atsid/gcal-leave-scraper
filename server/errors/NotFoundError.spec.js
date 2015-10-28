const { expect } = require('chai');
const NotFoundError = require('./NotFoundError');

describe('The NotFoundError', () => {
  describe('constructor', () => {
    it('should set message and httpStatus', () => {
      const error = new NotFoundError('oops');

      expect(error.message).to.equal('oops');
      expect(error.httpStatus).to.equal(404);
    });
  });
});
