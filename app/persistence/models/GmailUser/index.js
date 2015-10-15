const organizer = require('mongoose-organizer');
module.exports = mongoose => organizer.autowire('GmailUser', __dirname, {mongoose: mongoose});
