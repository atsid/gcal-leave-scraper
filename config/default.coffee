module.exports =
  app:
    name: 'gcal-leave-scraper'

  session:
    name: 'gcal-leave-scraper'
    secret: 'abc123-random'
    proxy: true

  clustering:
    workerLimit: 1
    entryPoint: __dirname + '/../server/main'

  server:
    port: 9000

  auth:
    google:
      clientID: '483242648844-4m8mi9d6pq0e5u96bb0pgat40rrvtlj8.apps.googleusercontent.com'
      clientSecret: 'h4tHW_t-TC0XbGHbqVE-B0Hi'
      domain: 'atsid.com'
      callbackURL: 'http://localhost:9000/api/auth/google/callback'
      scope: ['profile', 'openid']

  container:
    composed: false

  database:
    connectionString: 'mongodb://localhost:27017/gcal-leave-scraper'

  leaveKeywords: ['ooo', 'leave', 'off', 'vacation', 'holiday']
