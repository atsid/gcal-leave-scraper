const { expect } = require('chai');
const rewire = require('rewire');
const path = require('path');

describe('Init section cache control', () => {
  let jade;

  beforeEach(() => {
    jade = rewire('./jade');
  });

  it('should set correct name', () => {
    expect(jade.name).to.equal('jade rendering');
  });

  describe('configure function', () => {
    it('should configure app', () => {
      let slashRenderCalled = false;
      let htmlRenderCalled = false;
      const config = {};
      const sets = {};
      const gets = {};
      const engines = {};
      const app = {
        set: (key, value) => {
          sets[`${key}`] = value;
        },
        get: (pathPattern, handler) => {
          gets[`${pathPattern}`] = handler;
        },
        engine: (key, handler) => {
          engines[`${key}`] = handler;
        },
      };
      const slashRenderRes = {
        render: (page, pageConfig) => {
          slashRenderCalled = true;
          expect(page).to.equal('index');
          expect(pageConfig).to.equal(config);
        },
      };
      const htmlRenderRes = {
        render: (page, pageConfig) => {
          htmlRenderCalled = true;
          expect(page).to.equal('blah-blah-blah');
          expect(pageConfig).to.equal(config);
        },
      };

      jade.__set__('config', config);
      jade.configure(app);

      gets['/'](null, slashRenderRes);
      gets['/*.html']({url: '/blah-blah-blah.html'}, htmlRenderRes);
      expect(slashRenderCalled).to.equal(true);
      expect(htmlRenderCalled).to.equal(true);
      expect(sets.views.length).to.equal(1);
      expect(sets.views[0]).to.equal(path.join(__dirname, '../../../client/'));
      expect(sets['view engine']).to.equal('jade');
      expect(engines.jade).to.equal(require('jade').__express);
    });
  });
});
