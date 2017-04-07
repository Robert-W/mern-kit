const config = require('config/config');
const logger = require('lib/winston');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
* @function dropCollection
* @summary Drops the entire user collection
* @name exports.dropCollection
* @static
* @return {Promise}
*/
exports.dropCollection = () => new Promise((resolve, reject) => {
  logger.info('Dropping User collection');
  mongoose.connection.db.dropCollection('User', err => {
    if (err) {
      logger.error('Unable to drop User collection', err);
      reject(err);
    }
    resolve();
  });
});

/**
* @function populateCollection
* @summary Populates the user collection with an Admin account
* @name exports.populateCollection
* @static
* @return {Promise}
*/
exports.populateCollection = () => new Promise((resolve, reject) => {
  logger.info('Populating User collection');
  const {admin} = config.mongo;
  // Check for an admin user
  if (!admin || !admin.username || !admin.password) {
    logger.error('Missing default admin User');
    return reject();
  }
  // Create an admin user if one does not already exist
  User.findOne({ username: admin.username }).exec().then(user => {
    if (user) {
      logger.info('Admin user already created');
      return resolve();
    }

    const Administrator = new User({
      username: admin.username,
      password: admin.password,
      firstName: 'Mr.',
      lastName: 'Admin',
      email: 'admin@gmail.com'
    });

    Administrator.save(err => {
      if (err) {
        logger.error('Unable to create admin User', err);
        return reject(err);
      }
      logger.info('Successfully created admin user');
      resolve();
    });

  });

});
