const models = require('../persistence/index').models;
const debug = require('debug')('app:middleware:events:listEventsForMonth');
const sprintf = require('sprintf-js').sprintf;
const LeaveEvent = models.LeaveEvent;

function findEventsInRange(eventDateRange, callback) {
  const [myStartDate, myEndDate] = eventDateRange.toDate();

  debug(sprintf('Searching for events after %s and before %s', myStartDate.toISOString(), myEndDate.toISOString()));

  // Find events with a startDate >= the first day of the month and and endDate < the last day of the month
  LeaveEvent.find({endDate: {$gte: myStartDate}, startDate: {$lte: myEndDate}}, callback);
}

module.exports = {findEventsInRange};
