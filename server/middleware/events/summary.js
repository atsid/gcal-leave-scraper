const moment = require('moment');
const debug = require('debug')('app:middleware:events:summary');
const utils = require('../../components/CalendarUtils');
const searcher = require('../../components/LeaveCalendarSearcher');
require('moment-range');

module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    const startDate = moment(req.body.startDate).utc().startOf('day');
    const endDate = moment(req.body.endDate).utc().endOf('day');

    const range = moment.range(startDate, endDate);

    debug('Finding event summary for range "%s"', range.toString());

    searcher.findEventsInRange(range, (error, results) => {
      if (error) {
        res.status(400).json({message: 'Error loading leave events', detail: error});
      } else {
        utils.uniqueUsersInLeaveEventSet(results).then((uniqueUsers) => {
          let workingDays = 0;
          results.forEach((event) => {
            workingDays += utils.findWorkdaysInRange(event.startDate, event.endDate, range);
          });

          res.json({
            uniqueUsers: uniqueUsers,
            workingDays: workingDays,
            dateRange: range,
          });

          res.end();
        });
      }
    });
  }
};
