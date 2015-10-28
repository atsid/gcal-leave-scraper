const User = require('../../../../../persistence').models.User;
const debug = require('debug')('app:auth');

function getUserEntity(profile) {
  return {googleId: profile.id};
}

function handleTokens(user, token) {
  user.googleToken = token;

  return user.saveQ().spread((savedUser) => savedUser);
}

module.exports = (token, tokenSecret, profile, done) => {
  return User.findOneQ(getUserEntity(profile))
    .then((foundUser) => foundUser || User.createQ(getUserEntity(profile)))
    .then((user) => handleTokens(user, token))
    .then((user) => done(null, user))
    .catch((err) => {
      debug('error authenticating via google', err);
      done(err, null);
    });
};
