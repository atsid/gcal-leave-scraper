const debug = require('debug')('app:initialization');
const INIT_SECTIONS = [
  require('./sections/helmet'),
  require('./sections/forceSsl'),
  require('./sections/cacheControl'),
  require('./sections/compression'),
  require('./sections/bodyParsing'),
  require('./sections/staticContent'),
  require('./sections/sessions'),
  require('./sections/passport'),
  require('./sections/jade'),
  require('./sections/routing'),
  require('./sections/uiRouting'),
  require('./sections/errorHandling'),
];

function configure(app) {
  INIT_SECTIONS.forEach((sec) => {
    debug('configuring ' + sec.name);
    sec.configure(app);
  });
}

module.exports = {configure};
