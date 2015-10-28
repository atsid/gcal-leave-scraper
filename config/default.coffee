module.exports =
  app:
    name: 'gcal-leave-scraper'

  auth:
    google:
      clientID: 'your_client_id'
      clientSecret: 'your_client_secret'
      callbackURL: 'http://localhost:9000/api/auth/google/callback'

  container:
    composed: false

  database:
    connectionString: 'mongodb://localhost:27017/gcal-leave-scraper'

  leaveKeywords: ['ooo', 'leave', 'off', 'vacation', 'holiday']
