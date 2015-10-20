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
  build: ['gulpfile.js', 'gulp/**/*.js'],
  app: sourceNode('app', 'app'),
};
