const controller = require('../controllers/user.controller');
const schemas = require('../schemas/user.schema');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const utils = require(path.resolve('./config/utilities'));

/**
* @name exports
* @static
* @summary Routes for working with user models and schemas
*/
module.exports = app => {
  /**
  * @name /user
  * @summary GraphQL Endpoint for user information
  * @see user.schema
  * @memberof Router - ensureAuthenticated
  */
  app.use('/user', utils.ensureAuthenticated, graphqlHTTP({
    graphiql: true,
    schema: schemas.UserQuerySchema
  }));

  /**
  * @name /auth/signout
  * @see user.controller
  * @memberof Router
  */
  app.route('/auth/signout').get(controller.signout);

  /**
  * @name /auth/signin
  * @see user.controller
  * @memberof Router
  */
  app.route('/auth/signin').post(controller.signin);

  /**
  * @name /auth/signup
  * @see user.controller
  * @memberof Router
  */
  app.route('/auth/signup').post(controller.signup);

  /**
  * @name /auth/forgot
  * @see user.controller
  * @memberof Router
  */
  app.route('/auth/forgot').post(controller.forgot);

};
