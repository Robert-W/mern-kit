const path = require('path');
const config = require(path.resolve('./config/config'));

/**
* @function login
* @summary render the login page
* @name exports.login
* @static
* @param {User} user
* @param {Response} res - Express response object
*/
exports.login = (req, res) => {
  res.render('login', { loginjs: config.assets.login });
};
