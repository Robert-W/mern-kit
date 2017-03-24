const path = require('path');
const utils = require(path.resolve('./config/utils/route.utils'));
const controller = require('../controllers/home.controller');

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
