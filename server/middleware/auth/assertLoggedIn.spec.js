const { expect } = require('chai');
const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const auth = require('./assertLoggedIn');

describe('Auth middleware assert user is logged in', () => {
  it('should throw NotAuthorizedError if user is not logged in', () => {
    const req = {};
    const call = () => {
      auth(req, null, null);
    };

    expect(call).to.throw(NotAuthorizedError);
  });

  it('should call next when user is logged in', (done) => {
    const req = {
      user: 'test',
    };
    const next = () => done();

    auth(req, null, next);
  });
});
