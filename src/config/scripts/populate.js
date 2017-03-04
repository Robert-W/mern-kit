const path = require('path');
const mongoose = require(path.resolve('./config/lib/mongoose'));
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config'));

if (!config.files.scripts || config.files.scripts.length === 0) {
  logger.info('No scripts have been configured');
  process.exit(0);
}

mongoose.connect()
.then(() => {
  logger.info('Loading all database scripts');
  // Load all the scripts and drop those collections
  const scripts = config.files.scripts.map(file => require(path.resolve(file)));
  const promises = scripts.filter(script => script.populateCollection).map(script => script.populateCollection());

  return Promise.all(promises);
}).then(() => {
  logger.info('Successfully populated all collections');
  process.exit(0);
}).catch(err => {
  logger.error('Unable to populate collections', err);
  process.exit(err);
});
