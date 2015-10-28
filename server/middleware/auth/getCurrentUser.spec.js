const { expect } = require('chai');
const currentUser = require('./getCurrentUser');


describe('Auth middleware get current user', () => {
  function getResponse(resStatus, resJson, endHandler) {
    const res = {
      status: (code) => {
        resStatus.push(code);
        return res;
      },
      json: (obj) => {
        resJson.push(obj);
        return res;
      },
      end: () => {
        endHandler();
      },
    };

    return res;
  }

  it('handles case where user is not logged in', () => {
    let endCalled = false;
    const resStatus = [];
    const resJson = [];
    const response = getResponse(resStatus, resJson, () => endCalled = true);
    const request = {};

    currentUser(request, response);

    expect(resStatus.length).to.equal(1);
    expect(resJson.length).to.equal(1);
    expect(resStatus[0]).to.equal(404);
    expect(resJson[0].message).to.equal('No authenticated user found');
    expect(endCalled).to.equal(true);
  });

  it('handles case where user is logged in.', () => {
    let endCalled = false;
    const resStatus = [];
    const resJson = [];
    const response = getResponse(resStatus, resJson, () => endCalled = true);
    const request = {
      val: 'current-user',
      user: {
        process: (req) => {
          return req.val;
        },
      },
    };

    currentUser(request, response);

    expect(resStatus.length).to.equal(0);
    expect(resJson.length).to.equal(1);
    expect(resJson[0]).to.equal('current-user');
    expect(endCalled).to.equal(true);
  });
});
