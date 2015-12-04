const moment = require('moment');
const debug = require('debug')('app:server:components:CalendarUtils');
require('moment-range');

function findWorkdaysInRange(startDate, endDate, targetMonth, targetYear) {
  const targetMonthStartDate = moment().utc().year(targetYear).month(targetMonth).startOf('month');
  const targetMonthEndDate = moment().utc().year(targetYear).month(targetMonth).endOf('month');

  const wholeMonthRange = moment.range(targetMonthStartDate, targetMonthEndDate);

  // Set the start and end times
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
  console.log('Starting count');
  range.by('days', (currentMoment) => {
    const currentDay = currentMoment.day();
    if (currentDay !== 0 && currentDay !== 6) {
      console.log('Found workday: ' + currentDay + currentMoment.toString());
      // Increment all days that are not Saturday or Sunday
      workdays++;
    } else {
      console.log('Found non-workday: ' + currentDay);
    }
  });
  console.log('Total workdays: ' + workdays);

  return workdays;
}

module.exports = {findWorkdaysInRange};

