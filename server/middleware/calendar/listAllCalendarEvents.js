// TODO: Change fetch to use blue bird to match client
const fetch = require('node-fetch');
const { stringify } = require('querystring');

function errorNoUserFound(res) {
  res.status(404).json({message: 'No authenticated user found'});
}

function errorGeneric(res) {
  // (res, err) {
  // TODO: Add debug logging for the err message
  res.status(500).send({ error: 'Unable to fetch all events' });
}

function getQueryParams(req) {
  const timeMin = new Date();
  timeMin.setMilliseconds(0);
  timeMin.setSeconds(0);
  timeMin.setMinutes(0);
  timeMin.setHours(0);
  const timeMax = new Date(timeMin.getTime());
  timeMax.setFullYear(timeMax.getFullYear() + 1);
  return stringify({
    access_token: req.user.googleToken,
    domain: 'atsid.com',
    viewType: 'domain_public',
    maxResults: '2500',
    timeMax: timeMax.toISOString(),
    timeMin: timeMin.toISOString(),
  });
}

function fetchAllCalendarEvents(req, res) {
  const queryParams = getQueryParams(req);
  console.log('Fetching events from calendar: ', req.query.calendarId);
  return fetch('https://www.googleapis.com/calendar/v3/calendars/' + req.query.calendarId + '/events?' + queryParams)
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
    fetchAllCalendarEvents(req, res);
  }
};
