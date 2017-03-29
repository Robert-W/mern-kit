/**
* @name exports
* @static
* @summary Build configurations for home page modules
*/
module.exports = {
  webpack: {
    alias: {
      home: 'client/home'
    },
    entry: {
      home: 'client/home/index.js'
    }
  }
};
