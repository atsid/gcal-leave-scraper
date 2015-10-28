const Strategy = require('passport-google-oauth').OAuth2Strategy;
const oauthCallback = require('./oauthCallback');
const config = require('../../../../../appConfig');
const strategyConfig = {
  clientID: config.auth.google.clientID,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callbackURL,
};

module.exports = new Strategy(strategyConfig, oauthCallback);
