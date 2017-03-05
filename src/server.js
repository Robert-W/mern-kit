const mongoose = require('./config/lib/mongoose');
const express = require('./config/lib/express');
const logger = require('./config/lib/winston');
const config = require('./config/config');

logger.info('Starting the application');

mongoose.connect()
.then(connection => {
  return express.initialize(connection);
})
.then(app => {
  // Start on the configured port
  app.listen(config.port);
  logger.info(`App listening on port: ${config.port}`);
})
.catch(err => {
  logger.error('Fatal error starting the application', err);
  process.exit(err);
});
