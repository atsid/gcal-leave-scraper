const models = require('../../persistence/index').models;
const debug = require('debug')('app:middleware:events:listEventsForMonth');
const sprintf = require('sprintf-js').sprintf;
const LeaveEvent = models.LeaveEvent;

module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    var myStartDate = new Date();
    myStartDate.setUTCHours(0, 0, 0, 0);
    myStartDate.setUTCFullYear(req.params.year, req.params.month - 1, 1);

    var myEndDate = new Date();
    myEndDate.setUTCHours(0, 0, 0, 0);
    myEndDate.setUTCFullYear(req.params.year, req.params.month, 1);

    debug(sprintf("Searching for events after %s and before %s", myStartDate.toISOString(), myEndDate.toISOString()));

    // Find events with a startDate >= the first day of the month and and endDate < the last day of the month
    LeaveEvent.find({startDate: {$gte: myStartDate}, endDate: {$lt: myEndDate}}, (err, data) => {
      if (err) {
        res.json({message: "Error loading leave events", detail: err});
      } else {
        res.json(data);
      }

      res.end();
    });
  }
};
