const moment = require('moment');
const debug = require('debug')('app:server:components:CalendarUtils');
require('moment-range');

/**
 * Finds the number of working days in a given date range that also fall within the target month.
 * Holidays are not taken into account.
 *
 * Note that the targetMonth is zero-based (0=Jan, 11=Dec).
 *
 * startDate and endDate MUST be in UTC.  It is expected that both have zero for hours, minutes, seconds, and milliseconds.
 *
 * Sample google calendar date range:
 * "startDate" : ISODate("2015-12-14T00:00:00Z"), "endDate" : ISODate("2015-12-19T00:00:00Z")
 * This range is for an event that starts on 2015-12-14 and runs through the full day of 2015-12-18.  Notice
 * that Google handles full-day events by making the endDate midnight on the day AFTER the last day of the event.
 *
 * @param startDate Start date of the date range (inclusive).  Must be in UTC.
 * @param endDate End date of the date range (exclusive).  Must be in UTC.
 * @param targetMonth Zero-based month to search.  This is specified incase the range is not limited to a given month.
 * @param targetYear Year of the month to search.
 * @returns {number} Number of working days in the month.
 */
function findWorkdaysInRange(startDate, endDate, targetMonth, targetYear) {
  // Find the start and end of the target month.  Use UTC.
  const targetMonthStartDate = moment().utc().year(targetYear).month(targetMonth).startOf('month');
  const targetMonthEndDate = moment().utc().year(targetYear).month(targetMonth).endOf('month');
  const wholeMonthRange = moment.range(targetMonthStartDate, targetMonthEndDate);

  debug('Start Date %s End Date %s', startDate, endDate);
  debug('Whole month range "%s"', wholeMonthRange.toString());

  // Find the part of the date range that is completely within the month.
  let range = moment.range(moment(startDate).utc(), moment(endDate).utc().subtract(1, 'ms'));
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

