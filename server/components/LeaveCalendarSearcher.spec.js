const { expect } = require('chai');
const models = require('../persistence/index').models;
const Event = models.LeaveEvent;
const debug = require('debug')('app:middleware:events:listEventsForMonth');
const searcher = require('./LeaveCalendarSearcher');

describe('The LeaveCalendarSearcher', () => {
  describe('The findEventsInMonth function', () => {
    function saveEvent(startDate, endDate, title) {
      const newEvent = new Event({
        startDate: startDate,
        endDate: endDate,
        summary: title,
        id: 1,
        status: 'some status',
      });

      newEvent.save((err) => {
        if (err) {
          debug('Error saving new event');
        }
      });
    }

    beforeEach('Clean out the events table', () => {
      Event.remove({}, () => {
      });
    });

    it('correctly handles a single event that starts and ends in the same month', (done) => {
      const startDate = new Date('10/15/2015');
      const endDate = new Date('10/20/2015');
      saveEvent(startDate, endDate, 'My Title');
      searcher.findEventsInMonth(2015, 10, (error, result) => {
        expect(error).to.be.null;
        expect(result).not.to.be.null;
        expect(result.length).to.equal(1);

        const event = result[0];
        expect(event.summary).to.equal('My Title');
        expect(event.startDate.getTime()).to.equal(startDate.getTime());
        expect(event.endDate.getTime()).to.equal(endDate.getTime());

        done();
      });
    });

    it('correctly handles a single event that starts and ends in the same month when other events exist outside the month', (done) => {
      const startDate = new Date('10/15/2015');
      const endDate = new Date('10/20/2015');
      saveEvent(startDate, endDate, 'My Title');

      // Outside the timeframe
      saveEvent(new Date('9/20/2015'), new Date('9/30/2015'), 'September Event');
      saveEvent(new Date('11/1/2015'), new Date('11/13/2015'), 'November Event');

      // Do the search
      searcher.findEventsInMonth(2015, 10, (error, result) => {
        expect(error).to.be.null;
        expect(result).not.to.be.null;
        expect(result.length).to.equal(1);

        const event = result[0];
        expect(event.summary).to.equal('My Title');
        expect(event.startDate.getTime()).to.equal(startDate.getTime());
        expect(event.endDate.getTime()).to.equal(endDate.getTime());

        done();
      });
    });
  });
});

