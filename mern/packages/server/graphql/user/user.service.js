const { invariant } = require('utils/graphql.utils');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {

  /**
  * @description Find users in our Mongoose Models
  * @param {Object} args - GraphQL arguments
  * @param {Array<String> | String} args.usernames - usernames to search with
  * @param {Array<String> | String} args.emails = emails to search with
  * @return {Promise}
  */
  findUser: function ({ usernames, emails }) {
    invariant(
      (usernames || emails),
      'Missing arguments. You must provide atleast one `usernames` or `emails`.'
    );

    if (usernames) { return this.getUsersByUsername(usernames); }
    if (emails) { return this.getUsersByEmails(emails); }
  },

  /**
  * @description Find users by their usernames
  * @param {Array<String> | String} usernames - usernames to search with
  * @return {Promise}
  */
  getUsersByUsername: function (usernames) {
    const users = usernames.map(user => ({ username: user }));
    return User.find({ $or: users });
  },

  /**
  * @description Find users by their email addresses
  * @param {Array<String> | String} emails - emails to search with
  * @return {Promise}
  */
  getUsersByEmails: function (emails) {
    console.log(emails);
    const addresses = emails.map(addr => ({ email: addr }));
    return User.find({ $or: addresses });
  }

};
