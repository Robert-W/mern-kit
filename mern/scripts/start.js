const logger = require('lib/winston');
const nodemon = require('nodemon');

nodemon({
  ignore: ['node_modules'],
  script: 'packages/server/server.js',
  ext: 'js json pug',
  verbose: true,
  watch: [
    'packages/server/**/*.js',
    'packages/strategies/*.js',
    'packages/config/*.js',
    'packages/utils/*.js',
    'packages/env/*.js',
    'packages/lib/*.js',
    'packages/server/server.js'
  ],
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development'
  }
});

nodemon
.on('restart', files => {
  logger.verbose(`Nodemon restarting because ${files.join(',')} changed.`);
})
.on('crash', () => {
  logger.error('Nodemon crashed. Waiting for changes to restart.');
});
