const { compiledAssets } = require('config/config');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
* @function home
* @summary
* @name exports.home
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.home = (req, res) => {
  const user = req.user ? User.makeCopy(req.user) : {};

  res.render('home', {
    common: compiledAssets.js.common,
    homejs: compiledAssets.js.home,
    user: JSON.stringify(user)
  });
};
