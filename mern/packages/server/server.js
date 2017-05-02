const webpackUtils = require('utils/webpack.utils');
const mongoose = require('lib/mongoose');
const config = require('config/config');
const express = require('lib/express');
const logger = require('lib/winston');

logger.info('Starting the application');

webpackUtils.compileAssets()
.then(() => {
  return mongoose.connect();
})
.then(connection => {
  return express.initialize(connection);
})
.then(app => {
  app.listen(config.port);
  logger.info(`App listening on port: ${config.port}`);
})
.catch(err => {
  logger.error('Fatal error starting the application', err);
  process.exit(err);
});
