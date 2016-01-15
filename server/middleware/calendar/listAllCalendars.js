// TODO: Change fetch to use blue bird to match client
const fetch = require('node-fetch');
const { stringify } = require('querystring');

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

function errorGeneric(res) {
  // (res, err) {
  // TODO: Add debug logging for the err message
  res.status(500).send({ error: 'Unable to fetch all calendars' });
}

function getQueryParams(req) {
  return stringify({
    access_token: req.user.googleToken,
    domain: 'atsid.com',
    viewType: 'domain_public',
  });
}

function fetchAllCalendars(req, res) {
  const queryParams = getQueryParams(req);
  // NOTE: This only returns calendars for the loged in user, would require admin to get others
  // this could be fine if we change how we share calendars out on the domain
  return fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList?' + queryParams)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return res.json(data);
  })
  .catch(err => {
    errorGeneric(err, res);
  });
}

module.exports = (req, res) => {
  if (!req.user) {
    errorNoUserFound(res);
  } else {
    fetchAllCalendars(req, res);
  }
};
