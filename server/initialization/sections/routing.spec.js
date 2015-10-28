const { expect } = require('chai');
const rewire = require('rewire');
const path = require('path');

describe('Init section routing', () => {
  let routing;

  beforeEach(() => {
    routing = rewire('./routing');
  });

  it('should set correct name', () => {
    expect(routing.name).to.equal('app routing');
  });

  describe('configure function', () => {
    it('should configure app', () => {
      let mountieConfig;
      const mountie = (config) => {
        mountieConfig = config;
      };
      const app = {};

      routing.__set__('mountie', mountie);
      routing.configure(app);

      expect(mountieConfig).to.not.be.undefined;
      expect(mountieConfig.parent).to.equal(app);
      expect(mountieConfig.src).to.equal(path.join(__dirname, '../../routers'));
      expect(mountieConfig.prefix('oops')).to.equal('/api/oops');
      expect(mountieConfig.prefix('root')).to.equal('/api/');
    });
  });
});
