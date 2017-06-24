const { userResolver } = require('./user.resolver');
const UserSchema = require('./user.schema');

const { GraphQLString, GraphQLList } = require('graphql');

/**
* @name exports
* @static
* @summary GraphQL Query for the User's Model in Mongo
*/
module.exports = {
  type: new GraphQLList(UserSchema),
  description: 'Get information about your users',
  resolve: userResolver,
  args: {
    usernames: {
      type: new GraphQLList(GraphQLString),
      description: 'User\'s unique username(s)'
    },
    emails: {
      type: new GraphQLList(GraphQLString),
      description: 'User\'s email address(es)'
    }
  }
};
