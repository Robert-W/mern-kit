/**
* @name exports
* @static
* @summary Webpack config for home page modules
*/
module.exports = {
  // Standard webpack config items, these get added to your webpack config
  webpack: {
    alias: {
      home: 'client/home'
    },
    entry: {
      home: 'client/home/index.js'
    }
  }
};
