const moment = require('moment');
const debug = require('debug')('app:server:components:CalendarUtils');
require('moment-range');

function findWorkdaysInRange(startDate, endDate, targetMonth, targetYear) {
  const targetMonthStartDate = new Date(targetYear, targetMonth, 1);
  const targetMonthEndDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

  const wholeMonthRange = moment.range(targetMonthStartDate, targetMonthEndDate);

  // Set the start and end times
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);

  debug('Start Date %s End Date %s', startDate, endDate);
  debug('Whole month range "%s"', wholeMonthRange.toString());

  // Find the part of the date range that is completely within the month.
  let range = moment.range(startDate, endDate);
  debug('Date range "%s"', range.toString());

  range = range.intersect(wholeMonthRange);

  if (range === null) {
    debug('Dates are not within the specified month');
    return 0;
  }

  debug('Intersected date range "%s"', range.toString());

  const totalDays = range.diff('d') + 1;

  return totalDays;
}

module.exports = {findWorkdaysInRange};

