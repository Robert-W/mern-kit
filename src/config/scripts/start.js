const nodemon = require('nodemon');
const path = require('path');
const logger = require(path.resolve('./config/lib/winston'));

nodemon({
  ignore: ['node_modules'],
  script: 'server.js',
  ext: 'js json pug',
  verbose: true,
  watch: [
    'server/**/*.js',
    'config/**/*.js',
    '!config/scripts',
    'server.js'
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
