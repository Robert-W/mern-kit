// Set the environment to test in case it is not already set
process.env.NODE_ENV = 'test';
const path = require('path');
const fs = require('fs');
const makeWebpackConfig = require('config/webpack.config');
const assets = require('config/assets');
const logger = require('lib/winston');

const jestConfigPath = path.resolve('./packages/config/jest.config.json');
const aliases = {};

try {
  // Read in our base jest config
  const jestConfig = JSON.parse(fs.readFileSync(jestConfigPath, 'utf-8'));
  // Grab our aliases
  const { alias } = makeWebpackConfig().resolve;
  // Update our aliases to use the correct expression, like ^js(.*)$": "<rootDir>/src/js$1"
  Object.keys(alias).forEach(namespace => {
    aliases[`^${namespace}(.*)$`] = `${alias[namespace]}$1`;
  });
  // Update it based on our aliases, and mocks
  jestConfig.moduleNameMapper = Object.assign({}, {
    '\\.(css|scss)$': '<rootDir>/packages/__mocks__/object.js',
    '\\.(jpe?g|png|gif|svg)$': '<rootDir>/packages/__mocks__/object.js'
  }, aliases);
  // Set the test paths
  jestConfig.testMatch = [`<rootDir>/${assets.jest}`];
  // Set the files we want to have no affect on our coverage reports for Jest
  jestConfig.coveragePathIgnorePatterns = ['/lib/', '/config/', '/env/', '/utils/', '/models/'];
  // Write the file back out to jestConfig
  fs.writeFileSync(jestConfigPath, JSON.stringify(jestConfig, null, 2), 'utf-8');
} catch (err) {
  logger.error('Error preparing jest configuration file', err);
  process.exit(err);
}
