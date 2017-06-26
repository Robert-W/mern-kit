const UserQuery = require('server/graphql/user/user.query');
const {
	GraphQLSchema,
	GraphQLObjectType
} = require('graphql');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: UserQuery
    }
  })
});
