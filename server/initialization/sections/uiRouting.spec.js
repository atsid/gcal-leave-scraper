const { expect } = require('chai');
const rewire = require('rewire');

describe('UI Routing', () => {
  let uiRouting;
  let regex;

  beforeEach(() => {
    uiRouting = rewire('./uiRouting');
    regex = uiRouting.regex;
  });

  it('should set correct name', () => {
    expect(uiRouting.name).to.equal('ui route rewriting');
  });

  describe('route regex', () => {
    it('will allow calls to the root API to pass through', () => {
      expect('/api'.match(regex)).to.be.null;
      expect('/api/things'.match(regex)).to.be.null;
    });

    it('will match UI routes', () => {
      expect('/derps'.match(regex)).to.not.be.null;
      expect('/derps/herps'.match(regex)).to.not.be.null;
    });

    it('will not match filenames', () => {
      expect('/styles/style.css'.match(regex)).to.be.null;
      expect('/api.json'.match(regex)).to.be.null;
    });
  });

  describe('configure function', () => {
    it('should configure app', () => {
      const handler = {};
      const rendered = {};
      const config = {};
      const app = {
        get: (routePath, requestHandler) => {
          handler[`${routePath}`] = requestHandler;
        },
      };
      const res = {
        render: (page, pageConfig) => {
          rendered[`${page}`] = pageConfig;
        },
      };


      uiRouting.__set__('config', config);
      uiRouting.configure(app);
      handler[`${regex}`](null, res);

      expect(rendered.index).to.equal(config);
    });
  });
});
