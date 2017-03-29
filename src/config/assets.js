/**
* @name exports
* @static
* @summary location of all assets
*/
module.exports = {
  scripts: 'server/*/scripts/**/*.js',
  routes: 'server/*/routes/**/*.js',
  models: 'server/*/models/**/*.js',
  build: 'client/*/build.config.js',
  mocha: 'server/*/tests/**/*.js',
  jest: 'client/*/tests/**/*.js',
  views: 'server/*/views'
};
