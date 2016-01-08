// TODO: Need to fix test so it doesnt require google config
// const { expect } = require('chai');
// const rewire = require('rewire');
// const User = require('../../../persistence').models.User;

describe('Init section passport', () => {
  // let passport;
  // let addedUser;

  // beforeEach((done) => {
  //   passport = rewire('./index');
  //   User.createQ({
  //     'email': 'test@example.com',
  //     'name': 'name',
  //     'googleId': '123',
  //     'googleToken': 'token',
  //   })
  //     .then((user) => {
  //       addedUser = user;
  //       done();
  //     })
  //     .catch((err) => {
  //       // Ignore already exists error
  //       if (err && err.code !== 1100) {
  //         throw err;
  //       }

  //       done();
  //     });
  // });

  // afterEach((done) => {
  //   User.remove({}, (err) => {
  //     expect(err).to.be.null;
  //     done();
  //   });
  // });

  // it('has correct name', () => {
  //   expect(passport.name).to.equal('passport');
  // });

  describe('configure function', () => {
    // it('adds auth strategies', (done) => {
    //   const calls = {};
    //   const passportStrategies = [];
    //   let passportSerializedUserCalled = false;
    //   let passportDeserializedUserCalled = false;
    //   let passportInitCalled = false;
    //   let passportSessionCalled = false;
    //   let passportSerializeFunc;
    //   let passportDeserializeFunc;
    //   let passportRewire;
    //   let app;

    //   app = {
    //     use: (value) => {
    //       calls[`${value}`] = 1;
    //     },
    //   };

    //   passportRewire = {
    //     use: (strategy) => {
    //       expect(strategy).to.not.be.null;
    //       passportStrategies.push(strategy);
    //     },
    //     serializeUser: (serializeFunc) => {
    //       passportSerializedUserCalled = true;
    //       passportSerializeFunc = serializeFunc;
    //     },
    //     deserializeUser: (deserializeFunc) => {
    //       passportDeserializedUserCalled = true;
    //       passportDeserializeFunc = deserializeFunc;
    //     },
    //     initialize: () => {
    //       passportInitCalled = true;
    //       return 'init';
    //     },
    //     session: () => {
    //       passportSessionCalled = true;
    //       return 'session';
    //     },
    //   };

    //   passport.__set__('passport', passportRewire);
    //   passport.configure(app);

    //   expect(passportSerializedUserCalled).to.equal(true);
    //   expect(passportDeserializedUserCalled).to.equal(true);
    //   expect(passportInitCalled).to.equal(true);
    //   expect(passportSessionCalled).to.equal(true);
    //   expect(calls.init).to.equal(1);
    //   expect(calls.session).to.equal(1);

    //   passportSerializeFunc({'id': addedUser._id}, (err, userId) => {
    //     expect(err).to.be.null;
    //     expect(userId).to.not.be.null;
    //     expect(userId).to.equal(addedUser._id);

    //     passportDeserializeFunc(addedUser._id, (err2, user) => {
    //       expect(err2).to.be.null;
    //       expect(user).to.not.be.null;
    //       expect(user._id.toString()).to.equal(addedUser._id.toString());
    //       done();
    //     });
    //   });
    // });
  });
});
