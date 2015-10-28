const { expect } = require('chai');
const BadRequestError = require('./BadRequestError');

describe('The BadRequestError', () => {
  describe('constructor', () => {
    it('should set message and httpStatus', () => {
      const error = new BadRequestError('oops');

      expect(error.message).to.equal('oops');
      expect(error.httpStatus).to.equal(400);
    });
  });
});
