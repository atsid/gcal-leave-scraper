const config = require('../appConfig');
const getConnectionString = require('./getConnectionString');
const mongoose = require('mongoose-q')(require('mongoose'), {
  spread: true,
  q: require('q-bluebird'),
});

/**
 * Initializes the MongoDB Connection
 */
function connect() {
  const connectionString = getConnectionString(config);
  mongoose.connect(connectionString);
}

connect();
module.exports = mongoose;
