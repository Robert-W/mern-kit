const graphqlHTTP = require('express-graphql');
const CoreSchema = require('./core.schema');
const utils = require('utils/route.utils');

/**
* @name exports
* @static
* @summary GrahpQL Endpoint
*/
module.exports = app => {
  /**
  * @name /user
  * @summary GraphQL Endpoint for user information
  * @see core.schema
  * @memberof Router - ensureAuthenticated
  */
	app.use('/graphql', utils.ensureAuthenticated, graphqlHTTP({
		graphiql: process.env.NODE_ENV !== 'production',
		schema: CoreSchema
	}));

};
