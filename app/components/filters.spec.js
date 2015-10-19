const { expect } = require('chai');
const filters = require('./filters');

describe('The allDayEventFilter function', () => {
  const filter = filters.allDayEventFilter;

  function createEvent(timestamp) {
    return {
      'start': {
        'dateTime': timestamp,
      },
    };
  }

  it('correctly handles a missing start element', () => {
    expect(filter({})).to.equal(false);
  });

  it('correctly handles a missing start.dateTime element', () => {
    expect(filter({'start': {}})).to.equal(false);
  });

  it('correctly filters non-all day events', () => {
    expect(filter(createEvent('2015-10-14T09:00:00-07:00'))).to.equal(false);
  });

  it('correctly filters all day event', () => {
    expect(filter(createEvent('2015-10-14'))).to.equal(true);
  });
});

describe('The leaveEventFilter function', () => {
  const filter = filters.leaveEventFilter;

  function createEvent(summary) {
    return {
      'summary': summary,
    };
  }

  it('does not identify non-matching event as a match', () => {
    expect(filter(createEvent('This is a test event that should not match any keywords'))).to.equal(false);
  });

  it('matches at the start of summary', () => {
    expect(filter(createEvent('ooo test'))).to.be.equal(true);
  });

  it('matches at the end of the summary', () => {
    expect(filter(createEvent('test vacation'))).to.equal(true);
  });

  it('matches in the middle of the summary', () => {
    expect(filter(createEvent('I need a vacation today'))).to.equal(true);
  });

  it('matches ignoring case', () => {
    expect(filter(createEvent('VaCaTiOn'))).to.equal(true);
  });

  it('matches single whole word', () => {
    expect(filter(createEvent('off'))).to.equal(true);
  });

  it('matches single whole words', () => {
    expect(filter(createEvent('I am leaving now'))).to.equal(false);
  });
});
