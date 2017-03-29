/**
* @name exports
* @static
* @summary Webpack config for shared modules
*/
module.exports = {
  // Standard webpack config items, these get added to your webpack config
  webpack: {
    alias: {
      common: 'client/common'
    }
  }
};
