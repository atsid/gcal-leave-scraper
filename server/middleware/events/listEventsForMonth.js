const searcher = require('./../../components/LeaveCalendarSearcher');
const utils = require('../../components/CalendarUtils');

module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    searcher.findEventsInRange(utils.createMonthRange(req.params.month, req.params.year), (err, data) => {
      if (err) {
        res.json({message: 'Error loading leave events', detail: err});
      } else {
        res.json(data);
      }

      res.end();
    });
  }
};
