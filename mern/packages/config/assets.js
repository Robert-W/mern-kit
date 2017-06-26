/**
* @name exports
* @static
* @summary location of all assets
* @description paths must be relative to mern since they use glob to load
*/
module.exports = {
  scripts: 'packages/server/**/scripts/**/*.js',
  routes: 'packages/server/**/*.routes.js',
  models: 'packages/server/**/*.model.js',
  mocha: 'packages/server/**/*.test.js',
  views: 'packages/server/**/views',
  build: 'packages/client/*/build.config.js',
  jest: 'packages/client/**/*.test.js'
};
