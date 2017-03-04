const logger = require('./lib/winston');
const assets = require('./assets');
const path = require('path');
const glob = require('glob');

const getFilePaths = config => ({
  files: {
    // Get scripts
    scripts: glob.sync(config.scripts),
    // Get express routes
    routes: glob.sync(config.routes),
    // Get mongoose models
    models: glob.sync(config.models),
    // Get mocha tests
    mocha: glob.sync(config.mocha),
    // Get views
    views: glob.sync(config.views)
  }
});

const make = () => {
  // Validate the NODE_ENV and set a default if not provided
  if (process.env.NODE_ENV === null || process.env.NODE_ENV === undefined) {
    logger.warn('NODE_ENV is not set, setting to "development"');
    process.env.NODE_ENV = 'development';
  }
  // Get the default config
  const defaultConfig = require(path.resolve('./config/env/default'));
  // Get the environment config
  let environmentConfig = {};
  try {
    environmentConfig = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));
  } catch (err) {
    logger.warn(`No configuration files found matching environment ${process.env.NODE_ENV}`);
  }
  // Get assets config
  const assetPaths = getFilePaths(assets);

  return Object.assign({}, defaultConfig, environmentConfig, assetPaths);
};

module.exports = make();
