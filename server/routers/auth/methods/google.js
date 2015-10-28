const config = require('config');
const jefferson = require('express-jefferson');
const passport = require('passport');
const redirect = require('../../../middleware/redirect');

module.exports = jefferson.router({
  routes: {
    '/': {
      get: [passport.authenticate('google', {
        scope: config.auth.google.scope,
        hostedDomain: config.auth.google.domain,
      })],
    },
    '/callback': {
      get: [
        passport.authenticate('google', {failureRedirect: '/#/login'}),
        redirect('/'),
      ],
    },
  },
});
