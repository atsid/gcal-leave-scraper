const { expect } = require('chai');
const utils = require('./CalendarUtils');

describe('The CalendarUtils', () => {
  describe('The findWorkdaysInRange function', () => {
    it('returns the correct number of days when range is within the same week.', (done) => {
      const result = utils.findWorkdaysInRange(new Date('2015-12-14'), new Date('2015-12-17'), 12, 2015);

      expect(result).to.equal(4);

      done();
    });
  });
});
