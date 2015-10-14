const rewire = require('rewire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
const fs = require('fs-extra');
const Promise = require('bluebird');
const TARGET_FOLDER = './target/';
const TOKEN_DIR = TARGET_FOLDER + '.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'gcal-leave-scraper.json';
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const SECRET_FILE = TARGET_FOLDER + 'secret.json';
const AUTH_URL = '/auth-url';
let expect;

chai.use(chaiAsPromised);
chai.should();
expect = chai.expect;

function createCredentials() {
  const secrets = {
    'installed': {
      'client_secret': 'secret',
      'client_id': 'id',
      'redirect_uris': ['a', 'b', 'c'],
    },
  };

  fs.writeFileSync(SECRET_FILE, JSON.stringify(secrets));
}

function rewirePromptAsync(factory, flags) {
  const promptAsync = (questions) => {
    return new Promise((resolve) => {
      expect(questions[0]).to.not.be.undefined;
      expect(questions[0].name).to.equal('code');
      flags.promptAsyncCalled = true;
      resolve({'code': 'code12345'});
    });
  };
  factory.__set__('promptAsync', promptAsync);
}

function createOathClient() {
  return {
    'generateAuthUrl': (config) => {
      expect(config.access_type).to.equal('offline');
      expect(config.scope).to.equal(SCOPES);
      return AUTH_URL;
    },
    'credentials': 'nope',
    'getToken': (code, cb) => {
      expect(code).to.equal('code12345');
      cb(null, ['authToken']);
    },
  };
}

function rewireGoogleAuth(factory) {
  const GA = class GoogleAuth {
    constructor() {
    }

    OAuth2(clientId, clientSecret, redirectUrl) {
      expect(clientId).to.equal('id');
      expect(clientSecret).to.equal('secret');
      expect(redirectUrl).to.equal('a');

      return createOathClient();
    }
  };

  factory.__set__('GoogleAuth', GA);
}

function createAuthTokenFile() {
  fs.ensureDirSync(TOKEN_DIR);
  fs.outputJsonSync(TOKEN_PATH, 'authToken2');
}

describe('The GoogleAuthFactory', () => {
  const factory = rewire('./GoogleAuthFactory.js');
  nock.recorder.rec();
  nock.disableNetConnect();

  beforeEach(() => {
    factory.__set__('TOKEN_DIR', TOKEN_DIR);
    factory.__set__('TOKEN_PATH', TOKEN_PATH);

    fs.removeSync(TOKEN_DIR);
    fs.removeSync(SECRET_FILE);
    fs.ensureDirSync(TARGET_FOLDER);
  });

  afterEach(() => {
    fs.removeSync(TOKEN_DIR);
    fs.removeSync(SECRET_FILE);
  });

  it('throws error when secrets file does not exist', () => {
    expect(() => {
      factory({
        'secretsFile': SECRET_FILE,
        'scopes': SCOPES,
      });
    }).to.throw(Error, 'Could not find secrets file located in: ' + SECRET_FILE);
  });

  it('prompts for code when token does not exist', (done) => {
    const flags = {};
    let execute;
    let validate;

    createCredentials();
    rewirePromptAsync(factory, flags);
    rewireGoogleAuth(factory);

    validate = (auth) => {
      expect(auth).to.not.be.undefined;
      expect(auth.credentials).to.equal('authToken');
    };
    execute = () => {
      factory({
        'secretsFile': SECRET_FILE,
        'scopes': SCOPES,
      }).should.be.fulfilled.then(validate).should.notify(done);
    };

    new Promise(execute).then(() => {
      expect(flags.promptAsyncCalled).to.equal(true);
      expect(fs.existsSync(TOKEN_PATH)).to.equal(true);
      expect(fs.readJson(TOKEN_PATH)).to.equal('authToken');
    });
  });

  it('uses existing code when token exists', (done) => {
    let validate;

    createCredentials();
    createAuthTokenFile();
    rewireGoogleAuth(factory);

    validate = (auth) => {
      expect(auth).to.not.be.undefined;
      expect(auth.credentials).to.equal('authToken2');
    };

    factory({
      'secretsFile': SECRET_FILE,
      'scopes': SCOPES,
    }).should.be.fulfilled.then(validate).should.notify(done);
  });
});
