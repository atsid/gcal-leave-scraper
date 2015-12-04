const moment = require('moment');
const debug = require('debug')('app:server:components:CalendarUtils');
require('moment-range');

function findWorkdaysInRange(startDate, endDate, targetMonth, targetYear) {
  const wholeMonthRange = moment.range(new Date(targetYear, targetMonth, 1), new Date(targetYear, targetMonth + 1, 0, 23, 59, 59));

  debug('Whole month range "%s"', wholeMonthRange.toString());

  // Find the part of the date range that is completely within the month.
  let range = moment.range(startDate, endDate);
  debug('Date range "%s"', range.toString());

  range = range.intersect(wholeMonthRange);

  debug('Intersected date range "%s"', range.toString());

  const totalDays = range.diff('d');

  return totalDays;
}

module.exports = {findWorkdaysInRange};

