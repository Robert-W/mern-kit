/**
* @name exports
* @static
* @summary Build configurations for home page modules
*/
module.exports = {
  webpack: {
    alias: {
      home: 'packages/client/home'
    },
    entry: {
      home: 'packages/client/home/index.js'
    }
  }
};
