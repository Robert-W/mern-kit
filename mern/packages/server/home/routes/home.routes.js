const controller = require('server/home/controllers/home.controller');
const utils = require('utils/route.utils');

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
