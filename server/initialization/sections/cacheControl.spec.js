const { expect } = require('chai');
const rewire = require('rewire');

describe('Init section cache control', () => {
  let cacheControl;

  beforeEach(() => {
    cacheControl = rewire('./cacheControl');
  });

  it('should set correct name', () => {
    expect(cacheControl.name).to.equal('cache control');
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

      cacheControl.__set__('cacheResponseDirective', directive);
      cacheControl.configure(app);

      expect(useCalled).to.equal(true);
    });
  });
});
