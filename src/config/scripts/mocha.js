// Set the env to test before requiring the config file
// This must be done before the requires as it affects their behavior
process.env.NODE_ENV = 'test';
const Mocha = require('mocha');
const path = require('path');
const mongoose = require(path.resolve('./config/lib/mongoose'));
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config'));

const harness = new Mocha({
  ui: 'bdd',
  useColors: true,
  reporter: 'spec'
});

// Add all mocha files
config.files.mocha.forEach(file => harness.addFile(path.resolve(file)));

// Connect to mongoose then run all the tests
mongoose.connect()
.then(() => {
  harness.run(process.exit);
})
.catch(err => {
  logger.error('Unable to connect to Mongo', err);
});
