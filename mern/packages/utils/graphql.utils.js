const GraphQLError = require('graphql/error');

module.exports = {

  /**
  * @description Wrapper around a GraphQLError, Use this to assert some state
  * which the program believes to be true
  * @param {Any} condition - Some condition that evaluates to true or false
  * @param {String} message - Error message to use
  */
  invariant: (condition, message) => {
    if (!condition) { throw new GraphQLError(message); }
  }

};
