const { expect } = require('chai');
const rewire = require('rewire');

describe('Init section helmet', () => {
  let helmet;

  beforeEach(() => {
    helmet = rewire('./helmet');
  });

  it('should set correct name', () => {
    expect(helmet.name).to.equal('helmet hardening');
  });

  describe('configure function', () => {
    it('should configure app', () => {
      let useCalled = false;
      const directive = () => {
        return 'blah';
      };
      const app = {
        use: (value) => {
          useCalled = true;
          expect(value).to.equal('blah');
        },
      };

      helmet.__set__('helmet', directive);
      helmet.configure(app);

      expect(useCalled).to.equal(true);
    });
  });
});
