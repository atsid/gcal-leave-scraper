const searcher = require('./../../components/LeaveCalendarSearcher');

module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    searcher.findEventsInMonth(req.params.year, req.params.month, (err, data) => {
      if (err) {
        res.json({message: "Error loading leave events", detail: err});
      } else {
        res.json(data);
      }

      res.end();
    });
  }
};
