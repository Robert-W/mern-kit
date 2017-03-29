/**
* @name exports
* @static
* @summary Webpack config for user modules
*/
module.exports = {
  // Standard webpack config items, these get added to your webpack config
  webpack: {
    alias: {
      login: 'client/login'
    },
    entry: {
      login: 'client/login/index.js'
    }
  },
  // Non-standard webpack config items, these are used indirectly by webpack, via some custom plugins/scripts
  criticalStyle: '',
  rootComponent: ''
};
