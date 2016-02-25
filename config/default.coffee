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

  container:
    composed: false

  database:
    connectionString: 'LEAVE_TIMELINE_DB'

  leaveKeywords: ['ooo', 'leave', 'off', 'vacation', 'holiday']

  auth:
    google:
      clientID: 'GOOGLE_CLIENT_ID'
      clientSecret: 'GOOGLE_CLIENT_SECRET'
      domain: 'GOOGLE_CLIENT_DOMAIN'
      callbackURL: 'GOOGLE_CALLBACK'
      scope: [
        'profile',
        'openid',
        'https://www.googleapis.com/auth/admin.directory.user.readonly',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.readonly',
      ]
