/**
* @name exports
* @static
* @summary location of all assets
* @description paths must be relative to mern since they use glob to load
*/
module.exports = {
  scripts: 'packages/server/*/scripts/**/*.js',
  routes: 'packages/server/*/routes/**/*.js',
  models: 'packages/server/*/models/**/*.js',
  build: 'packages/client/*/build.config.js',
  mocha: 'packages/server/*/tests/**/*.js',
  jest: 'packages/client/*/tests/**/*.js',
  views: 'packages/server/*/views'
};
