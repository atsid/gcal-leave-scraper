const { expect } = require('chai');
const utils = require('./CalendarUtils');

describe('The CalendarUtils', () => {
  describe('The findWorkdaysInRange function', () => {
    it('returns the correct number of days when range is within the same week.', (done) => {
      const result = utils.findWorkdaysInRange(new Date('2015-12-14'), new Date('2015-12-17'), 11, 2015);

      expect(result).to.equal(4);

      done();
    });

    it('returns zero when the range is outside the target expected month', (done) => {
      // Target month is November (zero-based).  Date range is outside the target month
      const result = utils.findWorkdaysInRange(new Date('2015-12-14'), new Date('2015-12-17'), 10, 2015);

      expect(result).to.equal(0);

      done();
    });

    it('range contains a weekend', (done) => {
      // Target month is December (zero-based).  12/10-12/15 === Thursday-Tuesday
      const result = utils.findWorkdaysInRange(new Date('2015-12-10'), new Date('2015-12-15'), 11, 2015);

      expect(result).to.equal(4);

      done();
    });

    it('short range contains a weekend', (done) => {
      // Target month is December (zero-based).  12/11-12/14 === Friday-Monday
      const result = utils.findWorkdaysInRange(new Date('2015-12-11'), new Date('2015-12-14'), 11, 2015);

      expect(result).to.equal(2);

      done();
    });

    it('range is one working day', (done) => {
      // Target month is December (zero-based).
      const result = utils.findWorkdaysInRange(new Date('2015-12-10'), new Date('2015-12-10'), 11, 2015);

      expect(result).to.equal(1);

      done();
    });

    it('range is one Saturday', (done) => {
      // Target month is December (zero-based).  12/19 is Saturday
      const result = utils.findWorkdaysInRange(new Date('2015-12-19'), new Date('2015-12-19'), 11, 2015);

      expect(result).to.equal(0);

      done();
    });

    it('range is one Sunday', (done) => {
      // Target month is December (zero-based).  12/20 is Sunday
      const result = utils.findWorkdaysInRange(new Date('2015-12-20'), new Date('2015-12-20'), 11, 2015);

      expect(result).to.equal(0);

      done();
    });

    it('range is Saturday through Sunday', (done) => {
      // Target month is December (zero-based).  12/19 is Saturday, 12/20 is Sunday
      const result = utils.findWorkdaysInRange(new Date('2015-12-19'), new Date('2015-12-20'), 11, 2015);

      expect(result).to.equal(0);

      done();
    });

    it('range is 8 days / 6 working days', (done) => {
      // Target month is December (zero-based).
      const result = utils.findWorkdaysInRange(new Date('2015-12-15'), new Date('2015-12-22'), 11, 2015);

      expect(result).to.equal(6);

      done();
    });

    it('range is 15 days / 11 working days', (done) => {
      // Target month is December (zero-based).  12/1 and 12/15 are Tuesdays
      const result = utils.findWorkdaysInRange(new Date('2015-12-1'), new Date('2015-12-15'), 11, 2015);

      expect(result).to.equal(11);

      done();
    });

    it('range is the entire month', (done) => {
      // Target month is November (zero-based). 11/1 is Sunday and 11/30 is Monday
      const result = utils.findWorkdaysInRange(new Date('2015-11-1'), new Date('2015-11-30'), 10, 2015);

      expect(result).to.equal(21);

      done();
    });

    it('range starts and ends outside of the month', (done) => {
      // Target month is November (zero-based). 11/1 is Sunday and 11/30 is Monday
      const result = utils.findWorkdaysInRange(new Date('2015-10-15'), new Date('2015-12-5'), 10, 2015);

      expect(result).to.equal(21);

      done();
    });

    it('range starts outside the month', (done) => {
      // Target month is November (zero-based). 11/1 is Sunday and 11/30 is Monday
      const result = utils.findWorkdaysInRange(new Date('2015-10-31'), new Date('2015-11-3'), 10, 2015);

      expect(result).to.equal(2);

      done();
    });

    it('range ends outside the month', (done) => {
      // Target month is November (zero-based). 11/1 is Sunday and 11/30 is Monday
      const result = utils.findWorkdaysInRange(new Date('2015-11-26'), new Date('2015-12-3'), 10, 2015);

      expect(result).to.equal(3);

      done();
    });
  });
});
