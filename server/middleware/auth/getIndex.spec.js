const { expect } = require('chai');
const index = require('./getIndex');

describe('Auth middleware get index', () => {
  it('returns correct object and calls end', () => {
    let endCalled = false;
    const results = [];
    const response = {
      json: (obj) => {
        results.push(obj);
      },
      end: () => endCalled = true,
    };

    index(null, response);

    expect(endCalled).to.equal(true);
    expect(results.length).to.equal(1);
    expect(results[0].options[0]).to.equal('GET');
    expect(results[0].links.current).to.equal('/auth/current');
    expect(results[0].links.google).to.equal('/auth/google');
  });
});
