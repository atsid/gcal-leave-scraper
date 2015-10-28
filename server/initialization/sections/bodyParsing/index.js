const bodyParser = require('body-parser');
const parseDate = require('./parseIso8601Date');

module.exports = {
  name: 'body parsing',
  configure(app) {
    const reviveDates = (key, value) => parseDate(value);
    app.use(bodyParser.json({reviver: reviveDates}));
    app.use(bodyParser.urlencoded({extended: true}));
  },
};
