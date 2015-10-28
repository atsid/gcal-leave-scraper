const { expect } = require('chai');
const rewire = require('rewire');

describe('Init section body parsing', () => {
  let parser;

  beforeEach(() => {
    parser = rewire('./index');
  });

  it('has correct name', () => {
    expect(parser.name).to.equal('body parsing');
  });

  describe('configure function', () => {
    it('adds correct body parsers', () => {
      let jsonCalled = false;
      let urlencodedCalled = false;
      const calls = {};
      const app = {
        use: (value) => calls[`${value}`] = 1,
      };

      parser.__set__('bodyParser', {
        json: (options) => {
          const revivedDate = options.reviver(null, '2015-02-20T17:44:44.831Z');

          expect(revivedDate.getTime()).to.equal(1424454284831);
          jsonCalled = true;

          return 'json';
        },
        urlencoded: (options) => {
          expect(options.extended).to.equal(true);
          urlencodedCalled = true;

          return 'urlencoded';
        },
      });

      parser.configure(app);

      expect(jsonCalled).to.equal(true);
      expect(urlencodedCalled).to.equal(true);
      expect(calls.json).to.equal(1);
      expect(calls.urlencoded).to.equal(1);
    });
  });
});
