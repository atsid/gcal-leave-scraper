const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Promise = require('bluebird');
const rewire = require('rewire');
const User = require('../../../../../persistence').models.User;
let expect;

chai.use(chaiAsPromised);
chai.should();
expect = chai.expect;

describe('OAuth Callback', () => {
  let callback;

  beforeEach((done) => {
    callback = rewire('./oauthCallback');
    User.createQ({
      'email': 'test@example.com',
      'firstName': 'fname',
      'lastName': 'lname',
      'googleId': '123',
      'googleToken': 'token',
    })
      .then(() => done())
      .catch((err) => {
        // Ignore already exists error
        if (err && err.code !== 1100) {
          throw err;
        }

        done();
      });
  });

  afterEach((done) => {
    User.remove({}, (err) => {
      expect(err).to.be.null;
      done();
    });
  });

  function buildUserEntity() {
    return {
      id: '234',
      name: {
        familyName: 'lname',
        givenName: 'fname',
      },
    };
  }

  it('returns correct user if user already exists', (done) => {
    const doneCb = (err, user) => {
      expect(err).to.be.null;
      expect(user).to.not.be.undefined;
      expect(user).to.not.be.null;
      expect(user.googleId).to.equal('123');
      expect(user.firstName).to.equal('fname');
      expect(user.lastName).to.equal('lname');
      expect(user.email).to.equal('test@example.com');
      expect(user.googleToken).to.equal('tokenA1');
    };

    callback('tokenA1', 'tokenSecret', {id: '123'}, doneCb).should.be.fulfilled.should.notify(done);
  });

  it('creates user if one does not exist', (done) => {
    const doneCb = (err, user) => {
      expect(err).to.be.null;
      expect(user).to.not.be.undefined;
      expect(user).to.not.be.null;
      expect(user.googleId).to.equal('234');
      expect(user.firstName).to.equal('fname');
      expect(user.lastName).to.equal('lname');
      expect(user.email).to.be.undefined;
      expect(user.googleToken).to.equal('tokenA2');
    };

    callback('tokenA2', 'tokenSecret', buildUserEntity(), doneCb).should.be.fulfilled.should.notify(done);
  });

  it('calls callback with error', (done) => {
    const doneCb = (err, user) => {
      expect(err).to.not.be.null;
      expect(err.message).to.equal('test error');
      expect(user).to.be.null;
    };
    const myUser = {
      findOneQ: () => {
        return new Promise(() => {
          throw new Error('test error');
        });
      },
    };

    callback.__set__('User', myUser);
    callback('tokenA2', 'tokenSecret', {id: '234'}, doneCb).should.be.fulfilled.should.notify(done);
  });
})
;
