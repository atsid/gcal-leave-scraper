const config = {
  'container': {
    'composed': false,
  },
  'database': {
    'connectionString': 'mongodb://localhost:27017/gcal-leave-scraper',
  },
  'leaveKeywords': ['ooo', 'leave', 'off', 'vacation', 'holiday'],
};

module.exports = config;
