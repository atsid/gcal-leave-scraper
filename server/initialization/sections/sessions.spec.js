const { expect } = require('chai');
const rewire = require('rewire');

describe('Init section sessions', () => {
  let sessions;

  beforeEach(() => {
    sessions = rewire('./sessions');
  });

  it('should set correct name', () => {
    expect(sessions.name).to.equal('cookie-based sessions');
  });

  describe('configure function', () => {
    it('should configure app', () => {
      const calls = {};
      const cookieParser = () => {
        return 'cookie';
      };
      const config = {'session': 'session'};
      const session = (configSession) => {
        return configSession;
      };
      const app = {
        use: (value) => {
          calls[`${value}`] = 1;
        },
      };

      sessions.__set__('config', config);
      sessions.__set__('cookieParser', cookieParser);
      sessions.__set__('session', session);
      sessions.configure(app);

      expect(calls.session).to.equal(1);
      expect(calls.cookie).to.equal(1);
    });
  });
});
