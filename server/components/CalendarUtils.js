const moment = require('moment');
const debug = require('debug')('app:server:components:CalendarUtils');
require('moment-range');

function findWorkdaysInRange(startDate, endDate, targetMonth, targetYear) {
  // Find the start and end of the target month.  Use UTC.
  const targetMonthStartDate = moment().utc().year(targetYear).month(targetMonth).startOf('month');
  const targetMonthEndDate = moment().utc().year(targetYear).month(targetMonth).endOf('month');
  const wholeMonthRange = moment.range(targetMonthStartDate, targetMonthEndDate);

  // Set the start and end times.  Use UTC to keep in sync with the target month.
  const startMoment = moment(startDate).utc().startOf('day');
  const endMoment = moment(endDate).utc().endOf('day');

  debug('Start Date %s End Date %s', startMoment, endMoment);
  debug('Whole month range "%s"', wholeMonthRange.toString());

  // Find the part of the date range that is completely within the month.
  let range = moment.range(startMoment, endMoment);
  debug('Date range "%s"', range.toString());

  range = range.intersect(wholeMonthRange);

  if (range === null) {
    debug('Dates are not within the specified month');
    return 0;
  }

  debug('Intersected date range "%s"', range.toString());

  let workdays = 0;
  range.by('days', (currentMoment) => {
    const currentDay = currentMoment.day();
    if (currentDay !== 0 && currentDay !== 6) {
      // Increment all days that are not Saturday or Sunday
      workdays++;
    }
  });

  return workdays;
}

module.exports = {findWorkdaysInRange};

