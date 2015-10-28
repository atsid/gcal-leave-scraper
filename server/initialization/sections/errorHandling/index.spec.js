const { expect } = require('chai');
const rewire = require('rewire');

describe('Init section error handling', () => {
  let parser;

  beforeEach(() => {
    parser = rewire('./index');
  });

  it('has correct name', () => {
    expect(parser.name).to.equal('error handler');
  });

  describe('configure function', () => {
    it('adds error handler', () => {
      let useCalled = false;
      let handlerValue;
      const app = {
        use: (value) => {
          handlerValue = value;
          useCalled = true;
        },
      };

      parser.configure(app);

      expect(useCalled).to.equal(true);
      expect(handlerValue).to.equal(parser.__get__('errorHandler'));
    });
  });
});
