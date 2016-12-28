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

function dateTimeToDate(date) {
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);
  return date;
}

function getQueryParams(req) {
  const timeMin = dateTimeToDate(new Date(req.query.startDate));
  const timeMax = dateTimeToDate(new Date(req.query.endDate));
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
