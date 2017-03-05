const people = require('../data.json'); // Temp until mongoose and mongo are up and running with user models
const graphql = require('graphql');

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'User type for querying Mongoose user model',
  fields: () => {
    return {
      firstName: { type: graphql.GraphQLString },
      lastName: { type: graphql.GraphQLString },
      username: { type: graphql.GraphQLString },
      email: { type: graphql.GraphQLString },
      _id: { type: graphql.GraphQLString }
    };
  }
});

const UserQueryType = new graphql.GraphQLObjectType({
  name: 'UserQuery',
  description: 'User Queries',
  fields: {
    user: {
      type: new graphql.GraphQLList(UserType),
      args: {
        _id: { type: graphql.GraphQLString }
      },
      resolve: (root, args) => {
        return args._id ?
          [people.find(user => user._id === args._id)] :
          people;
      }
    }
  }
});

exports.UserQuerySchema = new graphql.GraphQLSchema({
  query: UserQueryType
});
