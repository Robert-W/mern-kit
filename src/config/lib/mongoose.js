const mongoose = require('mongoose');
const logger = require('./winston');
const path = require('path');
const config = require(path.resolve('./config/config'));

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
