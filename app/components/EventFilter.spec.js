const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const EventFilter = require('./EventFilter');
let expect;

chai.use(chaiAsPromised);
chai.should();
expect = chai.expect;

describe('The EventFilter', () => {
  let eventFilter;

  beforeEach(() => {
    eventFilter = new EventFilter();
  });

  describe('constructor', () => {
    it('adds filters', () => {
      const filterA = () => {
        return true;
      };
      const filterB = () => {
        return true;
      };
      let filters;

      eventFilter = new EventFilter([filterA, filterB]);

      filters = eventFilter.getFilters();
      expect(filters).to.not.be.undefined;
      expect(filters.length).to.equal(2);
      expect(filters[0]).to.equal(filterA);
      expect(filters[1]).to.equal(filterB);
    });
  });

  describe('addFilter function', () => {
    it('adds filters in correct order', () => {
      const filterA = () => {
        return true;
      };
      const filterB = () => {
        return true;
      };
      let filters;

      eventFilter.addFilter(filterB);
      eventFilter.addFilter(filterA);

      filters = eventFilter.getFilters();
      expect(filters).to.not.be.undefined;
      expect(filters.length).to.equal(2);
      expect(filters[1]).to.equal(filterA);
      expect(filters[0]).to.equal(filterB);
    });
  });

  describe('apply function', () => {
    it('does not generate errors on empty input list', (done) => {
      const filterA = (item) => {
        return item.a;
      };
      const filterB = (item) => {
        return item.b;
      };
      const eventList = [];
      const validate = (filteredEvents) => {
        expect(filteredEvents).to.not.be.undefined;
        expect(filteredEvents.length).to.equal(0);
      };

      eventFilter.addFilter(filterA);
      eventFilter.addFilter(filterB);

      eventFilter.apply(eventList).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('applies all filters', (done) => {
      const filterA = (item) => {
        return item.a;
      };
      const filterB = (item) => {
        return item.b;
      };
      const eventList = [{'a': true}, {'b': true}, {'a': true, 'b': true, 'c': 'value'}];
      const validate = (filteredEvents) => {
        expect(filteredEvents).to.not.be.undefined;
        expect(filteredEvents.length).to.equal(1);
        expect(filteredEvents[0].a).to.equal(true);
        expect(filteredEvents[0].b).to.equal(true);
        expect(filteredEvents[0].c).to.equal('value');
      };

      eventFilter.addFilter(filterA);
      eventFilter.addFilter(filterB);

      eventFilter.apply(eventList).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('applies filters in correct order', (done) => {
      const filterA = (item) => {
        return item.a;
      };
      const filterB = (item) => {
        return item.b.b;
      };
      const eventList = [];
      const validate = (filteredEvents) => {
        expect(filteredEvents).to.not.be.undefined;
        expect(filteredEvents.length).to.equal(1);
        expect(filteredEvents[0].a).to.equal(true);
        expect(filteredEvents[0].b.b).to.equal(true);
        expect(filteredEvents[0].c).to.equal('value');
      };

      // Will error if filterB is executed first
      eventList.push({
        'a': false,
      });
      // Filtered out due to no 'b.b'
      eventList.push({
        'a': true,
        'b': {},
      });
      // Filtered out due to no 'a'
      eventList.push({
        'b': {
          'b': true,
        },
      });
      // Valid event
      eventList.push({
        'a': true,
        'b': {'b': true},
        'c': 'value',
      });

      eventFilter.addFilter(filterA);
      eventFilter.addFilter(filterB);

      eventFilter.apply(eventList).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('returns full list with no filters', (done) => {
      const eventList = [{'a': true}, {'b': true}, {'a': true, 'b': true, 'c': 'value'}];
      const validate = (filteredEvents) => {
        expect(filteredEvents).to.not.be.undefined;
        expect(filteredEvents.length).to.equal(3);
      };

      eventFilter.apply(eventList).should.be.fulfilled.then(validate).should.notify(done);
    });
  });

  describe('clearFilters function', () => {
    it('removes all filters', () => {
      const filterA = () => {
        return true;
      };

      eventFilter.addFilter(filterA);

      expect(eventFilter.getFilters().length).to.equal(1);

      eventFilter.clearFilters();

      expect(eventFilter.getFilters().length).to.equal(0);
    });
  });
});
