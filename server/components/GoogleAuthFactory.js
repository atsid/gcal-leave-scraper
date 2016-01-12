const fs = require('fs');
const GoogleAuth = require('google-auth-library');
const dbg = require('debug');
const error = dbg('app:error');
const debug = dbg('app:factory:GoogleAuthFactory');
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'gcal-leave-scraper.json';
const Promise = require('bluebird');
const promptAsync = require('inquirer-bluebird').prompt;

Promise.promisifyAll(fs);

/**
 * Loads a JSON object from a file and returns it.  If an error occurs while loading file no object will be returned.
 *
 * @param secretsFile Path to secrets file to load
 */
function loadSecretsFile(secretsFile) {
  let content;

  try {
    content = fs.readFileSync(secretsFile, {'encoding': 'utf-8'});

    if (content) {
      return JSON.parse(content);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      error(err.message);
      throw new Error('Could not find secrets file located in: ' + secretsFile);
    }
  }
}

/**
 * Saves the token to disk to be used for later executions.
 * @param token auth token to save to disk
 */
function saveToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  debug('Token saved in ' + TOKEN_DIR);
}

/**
 * Processes the code entered by the user provided by Google.
 * @param oauth2Client OAuth client
 * @param code Code provided by Google
 * @returns {Promise.<T>}
 */
function processNewToken(oauth2Client, code) {
  Promise.promisifyAll(oauth2Client);
  return oauth2Client.getTokenAsync(code).then((token) => {
    oauth2Client.credentials = token[0];
    saveToken(token[0]);
  })
    .catch((err) => {
      error('Error while trying to retrieve access token ', err);
      throw err;
    });
}

/**
 * Prompts the user to obtain a code from a URL provided by the oath and then processes the new token.
 * @param oauth2Client OAuth client
 * @param scopes Scopes to use for requesting privileges
 * @returns {Promise.<T>|*}
 */
function getNewToken(oauth2Client, scopes) {
  let authUrl;
  let question;

  authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  question = `Authorize this app by visiting: \n${authUrl} \nThen enter the code from that page here: `;

  return promptAsync([{
    'message': question,
    'name': 'code',
  }])
    .then((code) => {
      return processNewToken(oauth2Client, code.code);
    });
}

/**
 * Authorizes a user using Google's OAuth.
 *
 * <pre>
 * Requires configuration in order to provide correct info for authentication:
 * - secretsFile Location to json config file stored from the Google developer console
 * - scopes Scopes requesting access to during authentication
 * </pre>
 * @param config Configuration object
 * @returns {Promise.<T>|*}
 */
function authorize(config) {
  const credentials = loadSecretsFile(config.secretsFile);
  const scopes = config.scopes;
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  let ret;

  const getCredentials = function() {
    let ret;
    if (fs.existsSync(TOKEN_PATH)) {
      ret = fs.readFileAsync(TOKEN_PATH).then((token) => {
        return JSON.parse(token);
      });
    }
    return ret;
  };

  if (fs.existsSync(TOKEN_PATH)) {
    ret = getCredentials().then((token) => {
      oauth2Client.credentials = token;
      return oauth2Client;
    });
    console.log('================================================= END', ret);
  } else {
    ret = getNewToken(oauth2Client, scopes).then(() => {
      return oauth2Client;
    });
  }

  return ret;
}

module.exports = authorize;
