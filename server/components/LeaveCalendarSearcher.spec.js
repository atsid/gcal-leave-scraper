const { expect } = require('chai');
const models = require('../persistence/index').models;
const Event = models.LeaveEvent;
const debug = require('debug')('app:server:components:leaveSearcher_tests');
const searcher = require('./LeaveCalendarSearcher');
const utils = require('./CalendarUtils');

const chai = require('chai');
chai.use(require('chai-string'));

describe('The LeaveCalendarSearcher', () => {
  describe('The findEventsInMonth function', () => {
    function saveEvent(startDate, endDate, title, id) {
      let initializedId = id;
      if (initializedId === undefined) {
        initializedId = 1;
      }

      const newEvent = new Event({
        startDate: startDate,
        endDate: endDate,
        summary: title,
        id: initializedId,
        status: 'some status',
      });

      newEvent.save((err) => {
        if (err) {
          debug('Error saving new event');
        }
      });
    }

    beforeEach('Clean out the events table', (done) => {
      Event.remove({}, () => {
        done();
      });
    });

    it('correctly handles a single event that starts and ends in the same month', (done) => {
      const startDate = new Date('10/15/2015');
      const endDate = new Date('10/20/2015');
      saveEvent(startDate, endDate, 'My Title');
      searcher.findEventsInRange(utils.createMonthRange(9, 2015), (error, result) => {
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
      searcher.findEventsInRange(utils.createMonthRange(9, 2015), (error, result) => {
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

    it('correctly handles a single event that starts before the time period and ends during the time period.', (done) => {
      const startDate = new Date('10/20/2015');
      const endDate = new Date('11/5/2015');
      saveEvent(startDate, endDate, 'My Title');

      // Outside the timeframe
      saveEvent(new Date('9/20/2015'), new Date('9/30/2015'), 'September Event');
      saveEvent(new Date('12/1/2015'), new Date('12/13/2015'), 'December Event');

      // Do the search
      searcher.findEventsInRange(utils.createMonthRange(10, 2015), (error, result) => {
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

    it('correctly handles a single event that starts during the time period and ends after the time period.', (done) => {
      const startDate = new Date('11/20/2015');
      const endDate = new Date('12/5/2015');
      saveEvent(startDate, endDate, 'My Title');

      // Outside the timeframe
      saveEvent(new Date('9/20/2015'), new Date('9/30/2015'), 'September Event');
      saveEvent(new Date('12/1/2015'), new Date('12/13/2015'), 'December Event');

      // Do the search
      searcher.findEventsInRange(utils.createMonthRange(10, 2015), (error, result) => {
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

    it('correctly handles a single event that starts before the time period and ends after the time period.', (done) => {
      const startDate = new Date('10/20/2015');
      const endDate = new Date('12/5/2015');
      saveEvent(startDate, endDate, 'My Title');

      // Outside the timeframe
      saveEvent(new Date('9/20/2015'), new Date('9/30/2015'), 'September Event');
      saveEvent(new Date('12/1/2015'), new Date('12/13/2015'), 'December Event');

      // Do the search
      searcher.findEventsInRange(utils.createMonthRange(10, 2015), (error, result) => {
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

    it('correctly handles a single event that covers the entire month.', (done) => {
      const startDate = new Date('11/1/2015');
      const endDate = new Date('11/30/2015');
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 59);
      saveEvent(startDate, endDate, 'My Title');

      // Outside the timeframe
      saveEvent(new Date('9/20/2015'), new Date('9/30/2015'), 'September Event');
      saveEvent(new Date('12/1/2015'), new Date('12/13/2015'), 'December Event');

      // Do the search
      searcher.findEventsInRange(utils.createMonthRange(10, 2015), (error, result) => {
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

    it('correctly handle extra events in the same month but a different year.', (done) => {
      const startDate = new Date('11/4/2015');
      const endDate = new Date('11/14/2015');
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 59);
      saveEvent(startDate, endDate, 'My Title', 1);

      // Outside the timeframe
      saveEvent(new Date('11/3/2014'), new Date('11/15/2014'), 'Last Year Event', 2);
      saveEvent(new Date('11/5/2016'), new Date('11/12/2016'), 'Next Year Event', 3);

      // Do the search
      searcher.findEventsInRange(utils.createMonthRange(10, 2015), (error, result) => {
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

    it('correctly handles lots of events', (done) => {
      const startDate = new Date('11/2/2015');
      const endDate = new Date('11/28/2015');

      // 1,000 Events in the timeframe
      for (let count = 0; count < 1000; count++) {
        saveEvent(startDate, endDate, 'My Title' + count, count);
      }

      // 1,000 Events before the timeframe
      for (let count = 1000; count < 2000; count++) {
        saveEvent(new Date('10/29/2015'), new Date('10/31/2015'), 'October Event' + count, count);
      }

      // 1,000 Events after the timeframe
      for (let count = 2000; count < 3000; count++) {
        saveEvent(new Date('12/29/2015'), new Date('12/31/2015'), 'December Event' + count, count);
      }

      // Outside the timeframe
      saveEvent(new Date('9/20/2015'), new Date('9/30/2015'), 'September Event');
      saveEvent(new Date('12/1/2015'), new Date('12/13/2015'), 'December Event');

      // Do the search
      searcher.findEventsInRange(utils.createMonthRange(10, 2015), (error, result) => {
        expect(error).to.be.null;
        expect(result).not.to.be.null;
        expect(result.length).to.equal(1000);

        for (let index = 0; index < result.length; index++) {
          const event = result[index];
          expect(event.summary).to.startsWith('My Title');
          expect(event.startDate.getTime()).to.equal(startDate.getTime());
          expect(event.endDate.getTime()).to.equal(endDate.getTime());
        }

        done();
      });
    });

    it('No event in the specified month', (done) => {
      // Outside the timeframe
      saveEvent(new Date('9/20/2015'), new Date('9/30/2015'), 'September Event');
      saveEvent(new Date('12/1/2015'), new Date('12/13/2015'), 'December Event');

      // Do the search
      searcher.findEventsInRange(utils.createMonthRange(10, 2015), (error, result) => {
        expect(error).to.be.null;
        expect(result).not.to.be.null;
        expect(result.length).to.equal(0);

        done();
      });
    });
  });
});

