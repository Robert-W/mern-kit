const {
	GraphQLObjectType,
	GraphQLString
} = require('graphql');

const UserSchema = new GraphQLObjectType({
  name: 'UserSchema',
  description: 'Representation of our User Model\'s in Mongoose',
  fields: () => ({
    username: {
      type: GraphQLString,
      description: 'Username for the user, may be the same as email.'
    },
    firstName: {
      type: GraphQLString,
      description: 'User\'s first name.'
    },
    lastName: {
      type: GraphQLString,
      description: 'User\'s last name.'
    },
    email: {
      type: GraphQLString,
      description: 'Registered email address for the user.'
    },
    created: {
      type: GraphQLString,
      description: 'Date the User\'s account was created.'
    },
    updated: {
      type: GraphQLString,
      description: 'Date the User\'s account was last updated.'
    }
  })
});

module.exports = UserSchema;
