const _lodash = require('lodash');

function sourceNode(rootName, root, extra = {}) {
  return _lodash.merge({
    all: [root + '/**/*.js'],
    source: [root + '/**/*.js', '!' + root + '/**/*.spec.js', '!' + root + '/**/*spec*/*'],
    test: [root + '/**/*.spec.js', root + '/**/*spec*/*'],
    output: {
      coverage: 'target/test-reports/' + rootName,
    },
  }, extra);
}

module.exports = {
  server: sourceNode('server', 'server'),
  all: sourceNode('all', '{client,server}'),
  build: ['gulpfile.js', 'gulp/**/*.js'],
  client: sourceNode('client', 'client', {
    styles: ['client/styles/**/*.scss'],
    staticJade: ['client/**/*.jade', '!client/**/*.dynamic.jade'],
    assets: ['client/assets/**/*.*'],
    html: ['client/**/*.html'],
    entries: ['client/app.js'],
    dist: {
      path: 'public',
      styles: 'public/styles',
      assets: 'public/assets',
      bundle: 'app.js',
    },
  }),
};
