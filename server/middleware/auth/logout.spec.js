const { expect } = require('chai');
const logout = require('./logout');

describe('Auth middleware logout', () => {
  it('calls logout, sets status 204 and sends response', () => {
    let logoutCalled = false;
    let statusCode;
    let sendCalled = false;
    const request = {
      logout: () => logoutCalled = true,
    };
    const response = {
      status: (code) => {
        statusCode = code;

        return response;
      },
      send: () => sendCalled = true,
    };

    logout(request, response);

    expect(logoutCalled).to.equal(true);
    expect(statusCode).to.equal(204);
    expect(sendCalled).to.equal(true);
  });
});
