// TODO: Change fetch to use blue bird to match client
const fetch = require('node-fetch');
const { stringify } = require('querystring');

// TODO: this should be db driven and configurable fro UI so it works for any domain
const excludes = {
  'admin@atsid.com': true,
  'jamieson.large@atsid.com': true,
  'jamieson.small@atsid.com': true,
};

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

function errorGeneric(res) {
  // (res, err) {
  // TODO: Add debug logging for the err message
  res.status(500).send({ error: 'Unable to fetch all users' });
}

function getQueryParams(req) {
  return stringify({
    access_token: req.user.googleToken,
    domain: 'atsid.com',
    viewType: 'domain_public',
    maxResults: '500',
  });
}

function fetchAllUsers(req, res) {
  const queryParams = getQueryParams(req);
  // TODO: this doesn't actually throw correctly
  return fetch('https://www.googleapis.com/admin/directory/v1/users?' + queryParams)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return res.json(data.users.filter(user => !excludes[user.primaryEmail]));
  })
  .catch(err => {
    errorGeneric(err, res);
  });
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchAllUsers(req, res);
  }
};
