const leaveKeywords = require('../appConfig').leaveKeywords;

/**
 * Checks if the event is an all day event (contains only a date).
 *
 * @param event Event to scan
 * @returns {boolean} True if only start date exists without timestamp, false otherwise
 */
function allDayEventFilter(event) {
  let retVal = false;

  if (event && event.start && event.start.dateTime && event.start.dateTime.match(/^\d\d\d\d-\d\d-\d\d$/g)) {
    retVal = true;
  }

  return retVal;
}

/**
 * Checks if the event summary contains any of the keywords that indicate it would be a leave event.
 *
 * @param event Event to scan
 * @returns {boolean} True if a leave event, false otherwise
 */
function leaveEventFilter(event) {
  let retVal = false;

  leaveKeywords.some((keyword) => {
    const regexString = `(^|\\s)${keyword}(?=\\s|$)`;
    const regex = new RegExp(regexString, 'gi');

    if (event.summary.match(regex)) {
      retVal = true;
    }
  });

  return retVal;
}

module.exports = {allDayEventFilter, leaveEventFilter};
