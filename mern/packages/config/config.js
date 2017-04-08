const assets = require('config/assets');
const logger = require('lib/winston');
const path = require('path');
const glob = require('glob');

const getFilePaths = () => ({
  files: {
    // Get scripts
    scripts: glob.sync(assets.scripts),
    // Get express routes
    routes: glob.sync(assets.routes),
    // Get mongoose models
    models: glob.sync(assets.models),
    // Get mocha tests
    mocha: glob.sync(assets.mocha),
    // Get views
    views: glob.sync(assets.views)
  }
});

const getClientConfig = () => ({
  client: {
    build: glob.sync(assets.build).map(conf => require(path.resolve(conf)))
  }
});

const make = () => {
  // Validate the NODE_ENV and set a default if not provided
  if (process.env.NODE_ENV === null || process.env.NODE_ENV === undefined) {
    logger.warn('NODE_ENV is not set, setting to "development"');
    process.env.NODE_ENV = 'development';
  }
  // Get the default config
  const defaultConfig = require('env/default');
  // Get the environment config
  let environmentConfig = {};
  try {
    environmentConfig = require(`env/${process.env.NODE_ENV}`);
  } catch (err) {
    logger.warn(`No configuration files found matching environment ${process.env.NODE_ENV}`);
  }
  // Get assets config
  const filesConfig = getFilePaths();
  // Get the client config
  const clientConfig = getClientConfig();

  return Object.assign({}, defaultConfig, environmentConfig, filesConfig, clientConfig);
};

module.exports = make();
