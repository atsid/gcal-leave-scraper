const organizer = require('mongoose-organizer');
module.exports = mongoose => organizer.autowire('Contact', __dirname, {mongoose: mongoose});
