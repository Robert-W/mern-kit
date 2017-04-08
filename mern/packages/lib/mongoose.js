const config = require('config/config');
const logger = require('lib/winston');
const mongoose = require('mongoose');
const path = require('path');

/**
* @name loadModels
* @summary Load all of our mongoose models
* @return {Promise}
*/
const loadModels = () => new Promise((resolve, reject) => {
  logger.info('Loading mongoose models');
  try {
    config.files.models.forEach(model => require(path.resolve(model)));
  } catch (err) {
    reject(err);
  }
  resolve();
});

/**
* @name connect
* @static
* @summary Connect to mongoose
* @return {Promise}
*/
module.exports.connect = () => new Promise((resolve, reject) => {
  logger.info('Connecting to MongoDB');
  // Set the promise library
  mongoose.Promise = Promise;
  // Attempt our connection
  mongoose.connect(config.mongo.db, error => {
    if (error) {
      logger.fatal('Error connecting to MongoDB', error);
      reject(error);
    } else {
      logger.info('Connected to MongoDB');
      loadModels().then(() => {
        logger.info('Loaded Mongoose models');
        resolve(mongoose.connection);
      }, err => {
        logger.error('Error loading Mongoose models', err);
        reject(err);
      });
    }
  });
});
