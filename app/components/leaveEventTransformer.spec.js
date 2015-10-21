const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const rewire = require('rewire');
const Promise = require('bluebird');
let expect;

chai.use(chaiAsPromised);
chai.should();
expect = chai.expect;

describe('The leaveEventTransformer', () => {
  const transformer = rewire('./leaveEventTransformer');

  function rewireGmailUser() {
    transformer.__set__('GmailUser', {
      'findAsync': Promise.method(() => {
        return [{
          '_id': 'id123',
        }];
      }),
    });
  }

  it('transforms leave event', (done) => {
    const leaveCalendarEvent = {
      'id': '1a',
      'status': 'confirmed',
      'summary': 'ooo test',
      'start': {
        'date': '1990-01-01',
      },
      'end': {
        'date': '1990-01-02',
      },
      'creator': {
        'email': 'test@example.com',
      },
    };
    const validate = (event) => {
      expect(event.id).to.equal('1a');
      expect(event.status).to.equal('confirmed');
      expect(event.summary).to.equal('ooo test');
      expect(event.startDate.getTime()).to.equal(new Date('1990-01-01').getTime());
      expect(event.endDate.getTime()).to.equal(new Date('1990-01-02').getTime());
      expect(event.gmailUser).to.equal('id123');
    };

    rewireGmailUser();

    transformer(leaveCalendarEvent).should.be.fulfilled.then(validate).should.notify(done);
  });
})
;
