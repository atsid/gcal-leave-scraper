const organizer = require('mongoose-organizer');
module.exports = mongoose => organizer.autowire('LeaveEvent', __dirname, {mongoose: mongoose});
