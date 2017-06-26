const userService = require('./user.service');

const formatUsers = hits => {
  return hits.map(hit => ({
    username: hit.username,
    firstName: hit.firstName,
    lastName: hit.lastName,
    email: hit.email,
    created: hit.created,
    updated: hit.updated
  }));
};

const userResolver = (root, args) => {
  return userService.findUser(args)
    .then(formatUsers);
};

module.exports = {
  userResolver,
  formatUsers
};
