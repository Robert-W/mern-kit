const path = require('path');
const config = require(path.resolve('./config/config'));

/**
* @function login
* @summary render the login page
* @name exports.login
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.login = (req, res) => {
  res.render('login', { loginjs: config.assets.login });
};
