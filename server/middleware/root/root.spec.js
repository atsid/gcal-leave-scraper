const {expect} = require('chai');
const root = require('./index');

describe('The Root Middleware', () => {
  it('can emit the service status', (done) => {
    let sentJson = false;
    const res = {
      json: (data) => {
        sentJson = true;
        expect(data.status).to.equal('ok');
        expect(data.links.auth).to.equal('/auth');
      },
      end: () => {
        expect(sentJson).to.be.true;
        done();
      },
    };

    root.get({}, res);
  });
});
