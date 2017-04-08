const User = require('mongoose').model('User');
const passport = require('passport');
const logger = require('lib/winston');
const glob = require('glob');
const path = require('path');

/**
* @name initialize
* @static
* @summary Initialize passport
*/
module.exports.initialize = () => {
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, '-salt -password', (err, user) => {
      done(err, user);
    });
  });

  // Load all our strategies
  glob.sync('packages/strategies/**/*.js').forEach(strategy => {
    try {
      require(path.resolve(strategy))();
    } catch (err) {
      logger.error('Failed to laod stratgey', err);
    }
  });
};
