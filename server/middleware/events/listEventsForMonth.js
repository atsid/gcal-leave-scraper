const models = require('../../persistence/index').models;
const debug = require('debug')('app:middleware:events:listEventsForMonth');
const sprintf = require('sprintf-js').sprintf;
const LeaveEvent = models.LeaveEvent;

module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    debug(sprintf("Searching for events in year %d and month %d", req.params.year, req.params.month));

    LeaveEvent.find((err, data) => {
      if(err) {
        res.json({message: "Error loading leave events", detail: err});
      } else {
        res.json(data);
      }

      res.end();
    });
  }
};
