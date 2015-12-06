const { expect } = require('chai');
const models = require('../persistence/index').models;
const User = models.GmailUser;
const Event = models.LeaveEvent;
const utils = require('./CalendarUtils');
const debug = require('debug')('app:server:components:leaveSearcher_tests');

describe('The CalendarUtils', () => {
  describe('uniqueUsersInLeaveEventSet function', () => {
    before('Setup dummy users', (done) => {
      // Remove all existing users then add the dummy users
      User.remove({}, () => {
        const newUser1 = new User({
          email: 'dummy1.user1@example.com',
          firstName: 'dummy1',
          lastName: 'user1',
          userId: 'dummy1user1',
        });

        newUser1.save((err) => {
          if (err) {
            debug('Error saving new user1');
          }
        });

        const newUser2 = new User({
          email: 'dummy2.user2@example.com',
          firstName: 'dummy2',
          lastName: 'user2',
          userId: 'dummy2user2',
        });

        newUser2.save((err) => {
          if (err) {
            debug('Error saving new user2');
          }
        });

        const newUser3 = new User({
          email: 'dummy3.user3@example.com',
          firstName: 'dummy3',
          lastName: 'user3',
          userId: 'dummy3user3',
        });

        // This user is never used.  It is here to make sure that the method being tested
        // does not just return all users.
        newUser3.save((err) => {
          if (err) {
            debug('Error saving new user3');
          }
        });

        done();
      });
    });

    function createEvent(userId) {
      return new Event({
        startDate: new Date(),
        endDate: new Date(),
        summary: 'A Leave Event Summary',
        id: '1',
        status: 'some_status',
        gmailUser: userId,
      });
    }

    it('single event returns a single valid GmailUser', () => {
      return utils.uniqueUsersInLeaveEventSet([createEvent('dummy1user1')]).then((result) => {
        expect(result.length).to.equal(1);
        expect(result[0].userId).to.equal('dummy1user1');
        expect(result[0].email).to.equal('dummy1.user1@example.com');
      });
    });

    it('two events returns a single valid GmailUser', () => {
      return utils.uniqueUsersInLeaveEventSet([createEvent('dummy1user1'), createEvent('dummy1user1')]).then((result) => {
        expect(result.length).to.equal(1);
        expect(result[0].userId).to.equal('dummy1user1');
        expect(result[0].email).to.equal('dummy1.user1@example.com');
      });
    });

    it('two events return different valid GmailUsers', () => {
      return utils.uniqueUsersInLeaveEventSet([createEvent('dummy1user1'), createEvent('dummy2user2')]).then((result) => {
        expect(result.length).to.equal(2);

        // User 1
        expect(result[0].userId).to.equal('dummy1user1');
        expect(result[0].email).to.equal('dummy1.user1@example.com');

        // User 2
        expect(result[1].userId).to.equal('dummy2user2');
        expect(result[1].email).to.equal('dummy2.user2@example.com');
      });
    });

    it('three events return two valid GmailUsers', () => {
      const events = [
        createEvent('dummy1user1'),
        createEvent('dummy2user2'),
        createEvent('dummy1user1'),
      ];

      return utils.uniqueUsersInLeaveEventSet(events).then((result) => {
        expect(result.length).to.equal(2);

        // User 1
        expect(result[0].userId).to.equal('dummy1user1');
        expect(result[0].email).to.equal('dummy1.user1@example.com');

        // User 2
        expect(result[1].userId).to.equal('dummy2user2');
        expect(result[1].email).to.equal('dummy2.user2@example.com');
      });
    });

    it('no events return empty set', () => {
      return utils.uniqueUsersInLeaveEventSet([]).then((result) => {
        expect(result.length).to.equal(0);
      });
    });

    it('many events return two users', () => {
      const events = [];
      for (let index = 0; index < 1000; index++) {
        events.push(createEvent('dummy1user1'));
        events.push(createEvent('dummy2user2'));
      }

      return utils.uniqueUsersInLeaveEventSet(events).then((result) => {
        expect(result.length).to.equal(2);

        // User 1
        expect(result[0].userId).to.equal('dummy1user1');
        expect(result[0].email).to.equal('dummy1.user1@example.com');

        // User 2
        expect(result[1].userId).to.equal('dummy2user2');
        expect(result[1].email).to.equal('dummy2.user2@example.com');
      });
    });

    it('user not found', () => {
      return utils.uniqueUsersInLeaveEventSet([createEvent('thisUserDoesNotExist')]).then((result) => {
        expect(result.length).to.equal(0);
      });
    });
  });
});
