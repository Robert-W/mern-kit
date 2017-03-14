const path = require('path');
const config = require(path.resolve('./config/config'));

/**
* @function home
* @summary
* @name exports.home
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.home = (req, res) => {
  res.render('home', { homejs: config.assets.home });
};
