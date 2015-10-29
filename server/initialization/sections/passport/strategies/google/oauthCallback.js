const User = require('../../../../../persistence').models.User;
const debug = require('debug')('app:auth');

function getUserEntity(profile) {
  return {googleId: profile.id};
}

function buildUserEntity(profile) {
  return {
    googleId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
  };
}


function handleTokens(user, token) {
  user.googleToken = token;

  return user.saveQ().spread((savedUser) => savedUser);
}

module.exports = (token, tokenSecret, profile, done) => {
  debug('user logged in from google: ', profile);
  return User.findOneQ(getUserEntity(profile))
    .then((foundUser) => foundUser || User.createQ(buildUserEntity(profile)))
    .then((user) => handleTokens(user, token))
    .then((user) => {
      debug('logging user in ', user);
      done(null, user);
    })
    .catch((err) => {
      debug('error authenticating via google', err);
      done(err, null);
    });
};
