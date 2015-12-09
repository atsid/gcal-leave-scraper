const { expect } = require('chai');
const utils = require('./CalendarUtils');

describe('The CalendarUtils', () => {
  describe('The findWorkdaysInRange function', () => {
    function createStartDate(year, month, day) {
      // Note that month is zero-based (0=Jan, 11=Dec)
      return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    }

    function createEndDate(year, month, day) {
      // Note that month is zero-based (0=Jan, 11=Dec)
      // Google Calendar all-day events end at 00:00:00 on the next day so add +1 to the last day
      return new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0, 0));
    }

    it('returns the correct number of days when range is within the same week.', (done) => {
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 14), createEndDate(2015, 12, 17), utils.createMonthRange(11, 2015));

      expect(result).to.equal(4);

      done();
    });

    it('returns zero when the range is outside the target expected month', (done) => {
      // Target month is November (zero-based).  Date range is outside the target month
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 14), createEndDate(2015, 12, 17), utils.createMonthRange(10, 2015));

      expect(result).to.equal(0);

      done();
    });

    it('range contains a weekend', (done) => {
      // Target month is December (zero-based).  12/10-12/15 === Thursday-Tuesday
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 10), createEndDate(2015, 12, 15), utils.createMonthRange(11, 2015));

      expect(result).to.equal(4);

      done();
    });

    it('short range contains a weekend', (done) => {
      // Target month is December (zero-based).  12/11-12/14 === Friday-Monday
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 11), createEndDate(2015, 12, 14), utils.createMonthRange(11, 2015));

      expect(result).to.equal(2);

      done();
    });

    it('range is one working day', (done) => {
      // Target month is December (zero-based).
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 10), createEndDate(2015, 12, 10), utils.createMonthRange(11, 2015));

      expect(result).to.equal(1);

      done();
    });

    it('range is one Saturday', (done) => {
      // Target month is December (zero-based).  12/19 is Saturday
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 19), createEndDate(2015, 12, 19), utils.createMonthRange(11, 2015));

      expect(result).to.equal(0);

      done();
    });

    it('range is one Sunday', (done) => {
      // Target month is December (zero-based).  12/20 is Sunday
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 20), createEndDate(2015, 12, 20), utils.createMonthRange(11, 2015));

      expect(result).to.equal(0);

      done();
    });

    it('range is Saturday through Sunday', (done) => {
      // Target month is December (zero-based).  12/19 is Saturday, 12/20 is Sunday
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 19), createEndDate(2015, 12, 20), utils.createMonthRange(11, 2015));

      expect(result).to.equal(0);

      done();
    });

    it('range is 8 days / 6 working days', (done) => {
      // Target month is December (zero-based).
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 15), createEndDate(2015, 12, 22), utils.createMonthRange(11, 2015));

      expect(result).to.equal(6);

      done();
    });

    it('range is 15 days / 11 working days', (done) => {
      // Target month is December (zero-based).  12/1 and 12/15 are Tuesdays
      const result = utils.findWorkdaysInRange(createStartDate(2015, 12, 1), createEndDate(2015, 12, 15), utils.createMonthRange(11, 2015));

      expect(result).to.equal(11);

      done();
    });

    it('range is the entire month', (done) => {
      // Target month is November (zero-based). 11/1 is Sunday and 11/30 is Monday
      const result = utils.findWorkdaysInRange(createStartDate(2015, 11, 1), createEndDate(2015, 11, 30), utils.createMonthRange(10, 2015));

      expect(result).to.equal(21);

      done();
    });

    it('range starts and ends outside of the month', (done) => {
      // Target month is November (zero-based). Range starts in October and runs into December
      const result = utils.findWorkdaysInRange(createStartDate(2015, 10, 15), createEndDate(2015, 12, 5), utils.createMonthRange(10, 2015));

      expect(result).to.equal(21);

      done();
    });

    it('range starts outside the month', (done) => {
      // Target month is November (zero-based).  Starts in October and ends in early November
      const result = utils.findWorkdaysInRange(createStartDate(2015, 10, 31), createEndDate(2015, 11, 3), utils.createMonthRange(10, 2015));

      expect(result).to.equal(2);

      done();
    });

    it('range ends outside the month', (done) => {
      // Target month is November (zero-based). Starts in late November and ends in September
      const result = utils.findWorkdaysInRange(createStartDate(2015, 11, 26), createEndDate(2015, 12, 3), utils.createMonthRange(10, 2015));

      expect(result).to.equal(3);

      done();
    });
  });
});
