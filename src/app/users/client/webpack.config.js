/**
* @name exports
* @static
* @summary Webpack config for user modules
*/
module.exports = {
  alias: {
    users: 'app/users/client'
  },
  entry: {
    login: 'app/users/client/index.js'
  }
};
