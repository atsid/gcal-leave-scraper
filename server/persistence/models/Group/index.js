const organizer = require('mongoose-organizer');
module.exports = mongoose => organizer.autowire('Group', __dirname, {mongoose: mongoose});
