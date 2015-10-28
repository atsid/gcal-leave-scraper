const { expect } = require('chai');
const rewire = require('rewire');

describe('Init section compression', () => {
  let compression;

  beforeEach(() => {
    compression = rewire('./compression');
  });

  it('should set correct name', () => {
    expect(compression.name).to.equal('compression');
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

      compression.__set__('compression', directive);
      compression.configure(app);

      expect(useCalled).to.equal(true);
    });
  });
});
