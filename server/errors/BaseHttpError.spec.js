const { expect } = require('chai');
const BaseHttpError = require('./BaseHttpError');

describe('The BaseHttpError', () => {
  describe('constructor', () => {
    it('should set message and httpStatus', () => {
      const error = new BaseHttpError('oops', 123);

      expect(error.message).to.equal('oops');
      expect(error.httpStatus).to.equal(123);
    });
  });
});
