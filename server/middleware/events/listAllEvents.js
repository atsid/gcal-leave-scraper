const models = require('../../persistence/index').models;
const LeaveEvent = models.LeaveEvent;

module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    LeaveEvent.find((err, data) => {
      if (err) {
        res.json({message: 'Error loading leave events', detail: err});
      } else {
        res.json(data);
      }

      res.end();
    });
  }
};
