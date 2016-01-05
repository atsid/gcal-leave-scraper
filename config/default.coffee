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
    connectionString: 'mongodb://localhost:27017/gcal-leave-scraper'

  leaveKeywords: ['ooo', 'leave', 'off', 'vacation', 'holiday']
