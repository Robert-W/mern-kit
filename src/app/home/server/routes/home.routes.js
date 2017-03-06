const path = require('path');
const controller = require('../controllers/home.controller');
const utils = require(path.resolve('./config/utilities'));

/**
* @name exports
* @static
* @summary Home page routes
*/
module.exports = app => {
  /**
  * @name /home
  * @see home.controller
  * @memberof Router
  */
  app.get('/home', utils.ensureAuthenticated, controller.home);
};
