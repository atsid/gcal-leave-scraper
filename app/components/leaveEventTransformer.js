const models = require('../persistence/index').models;
const GmailUser = models.GmailUser;
const LeaveEvent = models.LeaveEvent;
const Promise = require('bluebird');

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

  return new Promise((resolve) => {
    GmailUser.find({'email': event.creator.email}, (err, user) => {
      resolve(user[0]);
    });
  }).then(transform);
};
