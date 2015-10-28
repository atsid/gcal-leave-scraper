const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Promise = require('bluebird');
const rewire = require('rewire');
const models = require('../persistence/index').models;
const LeaveEvent = Promise.promisifyAll(models.LeaveEvent);
const GmailUser = models.GmailUser;
let expect;

chai.use(chaiAsPromised);
chai.should();
expect = chai.expect;

describe('The eventScanner', () => {
  describe('scan function', () => {
    const scanner = rewire('./eventScanner');
    const auth = {};
    const startDate = new Date('2015-01-01T00:00:00Z');
    const endDate = new Date('2015-01-10T00:00:00Z');

    function removeLeaveEvent(id) {
      return new Promise((resolve) => {
        LeaveEvent.remove({'id': id}, (err) => {
          expect(err).to.be.null;
          resolve();
        });
      });
    }

    function removeUser(email) {
      return new Promise((resolve) => {
        GmailUser.remove({'email': email}, (err) => {
          expect(err).to.be.null;
          resolve();
        });
      });
    }

    function createLeaveEvent(id, status, summary) {
      return new Promise((resolve) => {
        LeaveEvent.collection.insert([{
          'id': id,
          'status': status,
          'summary': summary,
          'gmailUser': '1',
          'startDate': startDate,
          'endDate': endDate,
        }], {}, (err) => {
          expect(err).to.be.null;
          resolve();
        });
      });
    }

    function createUser(email) {
      return new Promise((resolve) => {
        GmailUser.collection.insert([{
          'email': email,
          'firstName': 'fn',
          'lastName': 'ln',
          'userId': email,
        }], {}, (err) => {
          // Ignore already exists error
          if (err && err.code !== 11000) {
            throw err;
          }

          resolve();
        });
      });
    }

    function createGmailUser(email) {
      return {
        '_id': '123abc',
        'email': email,
      };
    }

    function generateNewEvent(email) {
      return [{
        'id': '101',
        'creator': {'email': email},
        'status': 'confirmed',
        'start': {'date': startDate},
        'end': {'date': endDate},
        'summary': 'test ooo 1',
      }];
    }

    function generateUpdatedEvent(email) {
      return [{
        'id': '99',
        'creator': {'email': email},
        'status': 'updated',
        'start': {'date': new Date('2015-01-02')},
        'end': {'date': new Date('2015-01-08')},
        'summary': 'new summary off',
      }];
    }

    function generateCancelledEvent(email) {
      return [{
        'id': '100',
        'creator': {'email': email},
        'status': 'cancelled',
        'start': {'date': new Date('2015-01-02')},
        'end': {'date': new Date('2015-01-08')},
        'summary': 'new summary off',
      }];
    }

    function generateNewCancelledEvent(email) {
      return [{
        'id': '101',
        'creator': {'email': email},
        'status': 'cancelled',
        'start': {'date': new Date('2015-01-02')},
        'end': {'date': new Date('2015-01-08')},
        'summary': 'new summary off',
      }];
    }

    function rewireHelper(retVals, callLog) {
      const genHelperResults = (email, pStartDate, pEndDate, handler) => {
        callLog.push({
          'email': email,
          'startDate': pStartDate,
          'endDate': pEndDate,
          'handler': handler,
          'auth': auth,
        });

        return Promise.map(retVals[email](email), handler);
      };

      scanner.__set__('helper', {
        processEventsForUser: Promise.method(genHelperResults),
      });
    }

    beforeEach((done) => {
      Promise.join(removeLeaveEvent('99'),
        removeLeaveEvent('100'),
        removeLeaveEvent('101'),
        createLeaveEvent('99', 'confirmed', 'ooo'),
        createLeaveEvent('100', 'cancelled', 'off'),
        createUser('test1@example.com'),
        createUser('test2@example.com'),
        createUser('test3@example.com'),
        createUser('test4@example.com'),
        () => done());
    });

    afterEach((done) => {
      Promise.join(removeLeaveEvent('99'),
        removeLeaveEvent('100'),
        removeLeaveEvent('101'),
        removeUser('test1@example.com'),
        removeUser('test2@example.com'),
        removeUser('test3@example.com'),
        removeUser('test4@example.com'),
        () => done());
    });

    it('should not error with no users', (done) => {
      const callLog = [];

      rewireHelper({}, callLog);

      scanner.scan([], startDate, endDate, auth).should.be.fulfilled.should.notify(done);
      expect(callLog.length).to.equal(0);
    });

    it('should not error with no events', (done) => {
      const callLog = [];
      const validate = () => {
        expect(callLog.length).to.equal(1);
        expect(callLog[0].email).to.equal('test1@example.com');
        expect(callLog[0].startDate).to.equal(startDate);
        expect(callLog[0].endDate).to.equal(endDate);
        expect(callLog[0].auth).to.equal(auth);
      };

      rewireHelper({
        'test1@example.com': () => {
          return [];
        },
      }, callLog);

      scanner.scan([createGmailUser('test1@example.com')], startDate, endDate, auth).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('should update an existing event', (done) => {
      const callLog = [];
      const validate = () => {
        return LeaveEvent.findAsync({'id': '99'}).then((leaveEvents) => {
          expect(callLog.length).to.equal(1);
          expect(leaveEvents.length).to.equal(1);
          expect(leaveEvents[0].id).to.equal('99');
          expect(leaveEvents[0].status).to.equal('updated');
          expect(leaveEvents[0].summary).to.equal('new summary off');
          expect(leaveEvents[0].startDate.getTime()).to.equal(new Date('2015-01-02').getTime());
          expect(leaveEvents[0].endDate.getTime()).to.equal(new Date('2015-01-08').getTime());
        });
      };

      rewireHelper({
        'test1@example.com': generateUpdatedEvent,
      }, callLog);

      scanner.scan([createGmailUser('test1@example.com')], startDate, endDate, auth).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('should delete an existing cancelled event', (done) => {
      const callLog = [];
      const validate = () => {
        return LeaveEvent.findAsync({'id': '100'}).then((leaveEvents) => {
          expect(callLog.length).to.equal(1);
          expect(leaveEvents.length).to.equal(0);
        });
      };

      rewireHelper({
        'test1@example.com': generateCancelledEvent,
      }, callLog);

      scanner.scan([createGmailUser('test1@example.com')], startDate, endDate, auth).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('should not create an event that has status of cancelled', (done) => {
      const callLog = [];
      const validate = () => {
        return LeaveEvent.findAsync({'id': '101'}).then((leaveEvents) => {
          expect(callLog.length).to.equal(1);
          expect(leaveEvents.length).to.equal(0);
        });
      };

      rewireHelper({
        'test1@example.com': generateNewCancelledEvent,
      }, callLog);

      scanner.scan([createGmailUser('test1@example.com')], startDate, endDate, auth).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('should create an event if it does not exist and is not canceled', (done) => {
      const callLog = [];
      const validate = () => {
        return LeaveEvent.findAsync({'id': '101'}).then((leaveEvents) => {
          expect(callLog.length).to.equal(1);
          expect(leaveEvents.length).to.equal(1);
          expect(leaveEvents[0].id).to.equal('101');
          expect(leaveEvents[0].status).to.equal('confirmed');
          expect(leaveEvents[0].summary).to.equal('test ooo 1');
          expect(leaveEvents[0].startDate.getTime()).to.equal(new Date(startDate).getTime());
          expect(leaveEvents[0].endDate.getTime()).to.equal(new Date(endDate).getTime());
        });
      };

      rewireHelper({
        'test1@example.com': generateNewEvent,
      }, callLog);

      scanner.scan([createGmailUser('test1@example.com')], startDate, endDate, auth).should.be.fulfilled.then(validate).should.notify(done);
    });
  });
});
