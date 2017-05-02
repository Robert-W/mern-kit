const controller = require('server/login/controllers/login.controller');

/**
* @name exports
* @static
* @summary Login route
*/
module.exports = app => {
  /**
  * @name /login
  * @see login.controller
  * @memberof Router
  */
  app.get('/', controller.login);
};
