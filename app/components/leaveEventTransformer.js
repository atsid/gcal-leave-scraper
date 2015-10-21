const models = require('../persistence/index').models;
const LeaveEvent = models.LeaveEvent;
const Promise = require('bluebird');
const GmailUser = Promise.promisifyAll(models.GmailUser);

module.exports = (event) => {
  const transform = (gmailUser) => {
    return new LeaveEvent({
      id: event.id,
      status: event.status,
      summary: event.summary,
      gmailUser: gmailUser._id,
      startDate: new Date(event.start.date),
      endDate: new Date(event.end.date),
    });
  };

  return GmailUser.findAsync({'email': event.creator.email}).then((users) => {
    return transform(users[0]);
  });
};
