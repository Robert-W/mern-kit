/**
* @name exports
* @static
* @summary location of all assets
*/
module.exports = {
  webpack: 'app/*/client/webpack.config.js',
  scripts: 'app/*/script/**/*.js',
  routes: 'app/*/server/routes/**/*.js',
  models: 'app/*/server/models/**/*.js',
  mocha: 'app/*/tests/mocha/**/*.js',
  jest: 'app/*/tests/jest/**/*.js',
  views: 'app/*/views'
};
