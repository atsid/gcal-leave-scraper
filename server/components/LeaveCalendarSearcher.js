const models = require('../persistence/index').models;
const debug = require('debug')('app:middleware:events:listEventsForMonth');
const LeaveEvent = models.LeaveEvent;

function findEventsInRange(eventDateRange, callback) {
  const [myStartDate, myEndDate] = eventDateRange.toDate();

  debug(`Searching for events after ${myStartDate.toISOString()} and before ${myEndDate.toISOString()}`);

  // Find events that start before the specified range end date and end after the specified range start date.
  // This will account for events that start and end outside the requested range.
  // Example: event: {start: 10-25-2015, end 12-5-2015} range: {start: 11-1-2015, 11-30-2015} should be returned
  LeaveEvent.find({endDate: {$gte: myStartDate}, startDate: {$lte: myEndDate}}, callback);
}

module.exports = {findEventsInRange};
