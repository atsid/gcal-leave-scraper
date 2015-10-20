const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Promise = require('bluebird');
const rewire = require('rewire');
let expect;

chai.use(chaiAsPromised);
chai.should();
expect = chai.expect;


describe('The GoogleCalendarShareHelper', () => {
  const helper = rewire('./GoogleCalendarShareHelper');
  const auth = {};

  describe('ensureCalendarsAvailable function', () => {
    function getUserList() {
      return [{
        'summary': 'test3@example.com',
      }];
    }

    function getUserList2() {
      return [{
        'summary': 'test2@example.com',
      }];
    }

    function getUserList3() {
      return [{
        'summary': 'test1@example.com',
      }];
    }

    function isLastPage(pageCount, args) {
      return !pageCount || args && args.pageToken && args.pageToken === pageCount;
    }

    function isFirstPage(args) {
      return args && !args.pageToken;
    }

    function isPage(args, pageNum) {
      return args && args.pageToken && args.pageToken === pageNum;
    }

    function handlePageToken(args, pageCount, resolveArgs) {
      if (isLastPage(pageCount, args)) {
        resolveArgs.nextSyncToken = 'token';
      } else if (isFirstPage(args)) {
        resolveArgs.nextPageToken = '2';
      } else if (args) {
        const pageToken = parseInt(args.pageToken, 10);

        resolveArgs.nextPageToken = `${pageToken + 1}`;
      }
    }

    function handleUserList(args, resolveArgs) {
      if (isPage(args, '2')) {
        resolveArgs.items = getUserList2();
      } else if (isPage(args, '3')) {
        resolveArgs.items = getUserList3();
      }
    }

    function rewireGetCalendarList(userList, pageCount) {
      const resolveArgs = {'items': userList};
      const handler = (args) => {
        handlePageToken(args, pageCount, resolveArgs);
        handleUserList(args, resolveArgs);

        return new Promise((resolve) => {
          resolve([resolveArgs]);
        });
      };

      helper.__set__('getCalendarList', handler);
    }

    function rewireAddUserCalendar(calls) {
      const addUserCalendar = (data) => {
        expect(data).to.not.be.undefined;
        expect(data.auth).to.not.be.undefined;
        expect(data.resource).to.not.be.undefined;
        expect(data.resource.id).to.not.be.undefined;

        calls[data.resource.id] = {
          'auth': data.auth,
          'resource': data.resource,
        };
      };

      helper.__set__('addUserCalendar', addUserCalendar);
    }

    function getGmailUserList() {
      return [{
        'userId': '1',
        'email': 'test1@example.com',
        'firstName': 'first1',
        'lastName': 'last1',
      }, {
        'userId': '2',
        'email': 'test2@example.com',
        'firstName': 'first2',
        'lastName': 'last2',
      }, {
        'userId': '3',
        'email': 'test3@example.com',
        'firstName': 'first3',
        'lastName': 'last3',
      }, {
        'userId': '4',
        'email': 'test4@example.com',
        'firstName': 'first4',
        'lastName': 'last4',
      }];
    }

    it('should not error on empty gmailUsers list', (done) => {
      const callLog = [];
      let validate;

      rewireGetCalendarList([]);
      rewireAddUserCalendar(callLog);

      validate = () => {
        expect(callLog.length).to.equal(0);
      };

      helper.ensureCalendarsAvailable([], auth).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('should only add users not already in list', (done) => {
      const callLog = {};
      let validate;
      let log1;
      let log2;
      let log3;
      let log4;

      rewireGetCalendarList(getUserList());
      rewireAddUserCalendar(callLog);

      validate = () => {
        log1 = callLog['test1@example.com'];
        log2 = callLog['test2@example.com'];
        log3 = callLog['test3@example.com'];
        log4 = callLog['test4@example.com'];

        expect(log1).to.not.be.undefined;
        expect(log1.auth).to.equal(auth);
        expect(log1.resource).to.not.be.undefined;
        expect(log1.resource.id).to.equal('test1@example.com');
        expect(log1.resource.hidden).to.be.equal(false);

        expect(log2).to.not.be.undefined;
        expect(log2.auth).to.equal(auth);
        expect(log2.resource).to.not.be.undefined;
        expect(log2.resource.id).to.equal('test2@example.com');
        expect(log2.resource.hidden).to.be.equal(false);

        expect(log3).to.be.undefined;

        expect(log4).to.not.be.undefined;
        expect(log4.auth).to.equal(auth);
        expect(log4.resource).to.not.be.undefined;
        expect(log4.resource.id).to.equal('test4@example.com');
        expect(log4.resource.hidden).to.be.equal(false);
      };

      helper.ensureCalendarsAvailable(getGmailUserList(), auth).should.be.fulfilled.then(validate).should.notify(done);
    });

    it('should handle paging of users', (done) => {
      const callLog = {};
      let validate;
      let log1;
      let log2;
      let log3;
      let log4;

      rewireGetCalendarList(getUserList(), '3');
      rewireAddUserCalendar(callLog);

      validate = () => {
        log1 = callLog['test1@example.com'];
        log2 = callLog['test2@example.com'];
        log3 = callLog['test3@example.com'];
        log4 = callLog['test4@example.com'];

        expect(log1).to.be.undefined;
        expect(log2).to.be.undefined;
        expect(log3).to.be.undefined;

        expect(log4).to.not.be.undefined;
        expect(log4.auth).to.equal(auth);
        expect(log4.resource).to.not.be.undefined;
        expect(log4.resource.id).to.equal('test4@example.com');
        expect(log4.resource.hidden).to.be.equal(false);
      };

      helper.ensureCalendarsAvailable(getGmailUserList(), auth).should.be.fulfilled.then(validate).should.notify(done);
    });
  });

  describe('processEventsForUser function', () => {
    function getEventList() {
      return [{
        'summary': 'event1',
      }, {
        'summary': 'event4',
      }];
    }

    function getEventList2() {
      return [{
        'summary': 'event2',
      }];
    }

    function getEventList3() {
      return [{
        'summary': 'event3',
      }];
    }

    function isLastPage(pageCount, args) {
      return !pageCount || args && args.pageToken && args.pageToken === pageCount;
    }

    function isFirstPage(args) {
      return args && !args.pageToken;
    }

    function isPage(args, pageNum) {
      return args && args.pageToken && args.pageToken === pageNum;
    }

    function handlePageToken(args, pageCount, resolveArgs) {
      if (isLastPage(pageCount, args)) {
        resolveArgs.nextSyncToken = 'token';
      } else if (isFirstPage(args)) {
        resolveArgs.nextPageToken = '2';
      } else if (args) {
        const pageToken = parseInt(args.pageToken, 10);

        resolveArgs.nextPageToken = `${pageToken + 1}`;
      }
    }

    function handleEventList(args, resolveArgs) {
      if (isPage(args, '2')) {
        resolveArgs.items = getEventList2();
      } else if (isPage(args, '3')) {
        resolveArgs.items = getEventList3();
      }
    }

    function rewireGetEventList(events, pageCount) {
      const resolveArgs = {'items': events};
      const handler = (args) => {
        handlePageToken(args, pageCount, resolveArgs);
        handleEventList(args, resolveArgs);

        return new Promise((resolve) => {
          resolve([resolveArgs]);
        });
      };

      helper.__set__('getEventList', handler);
    }

    it('should not error on empty user', (done) => {
      const handler = () => {
        chai.assert.fail('Unexpected call to handler on undefined user');
      };

      rewireGetEventList(getEventList());

      helper.processEventsForUser(null, '2000-01-01T00:00:00', '2000-01-02T00:00:00', handler, auth).should.be.fulfilled.should.notify(done);
    });

    it('should not error on empty event list', (done) => {
      const handler = () => {
        chai.assert.fail('Unexpected call to handler on empty event list');
      };

      rewireGetEventList([]);

      helper.processEventsForUser('test@example.com', '2000-01-01T00:00:00', '2000-01-02T00:00:00', handler, auth).should.be.fulfilled.should.notify(done);
    });

    it('should properly handle paging', (done) => {
      const callLog = {};
      let callCount = 0;
      let validate;
      let log1;
      let log2;
      let log3;
      let log4;
      let handler;

      rewireGetEventList(getEventList(), '3');

      handler = (item) => {
        callCount++;
        expect(item).to.not.be.undefined;
        expect(item.summary).to.not.be.undefined;
        callLog[item.summary] = item;
      };

      validate = () => {
        log1 = callLog.event1;
        log2 = callLog.event2;
        log3 = callLog.event3;
        log4 = callLog.event4;

        expect(callCount).to.equal(4);

        expect(log1).to.not.be.undefined;
        expect(log1.summary).to.equal('event1');

        expect(log2).to.not.be.undefined;
        expect(log2.summary).to.equal('event2');

        expect(log3).to.not.be.undefined;
        expect(log3.summary).to.equal('event3');

        expect(log4).to.not.be.undefined;
        expect(log4.summary).to.equal('event4');
      };

      helper.processEventsForUser('test@example.com', '2000-01-01T00:00:00', '2000-01-02T00:00:00', handler, auth).should.be.fulfilled.then(validate).should.notify(done);
    });
  });
})
;
