const path = require('path');
const { compiledAssets } = require(path.resolve('./config/config'));

/**
* @function home
* @summary
* @name exports.home
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.home = (req, res) => {
  res.render('home', {
    common: compiledAssets.js.common,
    homejs: compiledAssets.js.home
  });
};
