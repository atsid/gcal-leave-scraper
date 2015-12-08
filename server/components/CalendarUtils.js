const moment = require('moment');
const debug = require('debug')('app:server:components:CalendarUtils');
const models = require('../persistence/index').models;
const User = models.GmailUser;
require('moment-range');

/**
 * Converts a month / year to a moment-range object.
 * @param targetMonth Zero-based month
 * @param targetYear Year
 * @returns {!DateRange} moment-range thet covers the entire month
 */
function createMonthRange(targetMonth, targetYear) {
  debug('targetMonth: %s targetYear: %s', targetMonth, targetYear);

  // Find the start and end of the target month.  Use UTC.
  const targetMonthStartDate = moment([targetYear, targetMonth]).utc().startOf('month');
  const targetMonthEndDate = moment([targetYear, targetMonth]).utc().endOf('month');

  debug('Creating range that starts "%s" and ends "%s"', targetMonthStartDate, targetMonthEndDate);

  return moment.range(targetMonthStartDate, targetMonthEndDate);
}

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
function findWorkdaysInRange(startDate, endDate, targetDateRange) {
  debug('Start Date %s End Date %s', startDate, endDate);
  debug('Target date range "%s"', targetDateRange.toString());

  // Find the part of the date range that is completely within the month.
  let range = moment.range(moment(startDate).utc(), moment(endDate).utc().subtract(1, 'ms'));
  debug('Date range "%s"', range.toString());

  range = range.intersect(targetDateRange);

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

/**
 * Returns the unique set of users in a set of leave events.
 * @param leaveEvents Set of leave events.
 * @returns {Promise} Set of GMailUsers that are used by these leave events
 */
function uniqueUsersInLeaveEventSet(leaveEvents) {
  const userIds = new Set();

  leaveEvents.map((leaveEvent) => {
    const gmailUserId = leaveEvent.gmailUser;
    userIds.add(gmailUserId);
  });

  return User.find().where('userId').in(Array.from(userIds)).exec();
}

module.exports = {findWorkdaysInRange, uniqueUsersInLeaveEventSet, createMonthRange};

