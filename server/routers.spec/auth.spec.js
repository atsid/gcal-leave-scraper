// TODO: Need to fix test so it doesnt require google config
// const {expect} = require('chai');
// const app = require('../server');
// const Session = require('supertest-session')({app: app});
// const nock = require('nock');

describe('/api/auth', () => {
  // let sess = null;
  // beforeEach((done) => {
  //   nock.enableNetConnect();
  //   require('../startup_hooks').resolve().then(done());
  // });
  // beforeEach(() => sess = new Session());
  // afterEach(() => sess.destroy());

  // it('GET emits authentication details', (done) => {
  //   sess.get('/api/auth/')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       const body = res.body;
  //       expect(err).to.be.null;
  //       expect(body.options).to.be.an.array;
  //       expect(body.options.length).to.be.greaterThan(0);
  //       expect(body.links).to.be.an.object;
  //       done();
  //     });
  // });

  // describe('/current', () => {
  //   it('GET will emit a 404 if the client is not authenticated', (done) => {
  //     sess
  //       .get('/api/auth/current')
  //       .expect(404)
  //       .expect('Content-Type', /json/)
  //       .end((err) => {
  //         expect(err).to.be.null;
  //         done();
  //       });
  //   });
  // });
});
