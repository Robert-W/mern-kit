const path = require('path');
const { compiledAssets } = require(path.resolve('./config/config'));


/**
* @function login
* @summary render the login page
* @name exports.login
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.login = (req, res) => {
  res.render('login', {
    common: compiledAssets.js.common,
    loginjs: compiledAssets.js.login
  });
};
