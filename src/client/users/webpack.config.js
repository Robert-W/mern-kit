/**
* @name exports
* @static
* @summary Webpack config for user modules
*/
module.exports = {
  alias: {
    users: 'client/users'
  },
  entry: {
    login: 'client/users/index.js'
  }
};
