const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = () => {
  passport.use(new LocalStrategy((username, password, done) => {
    // Find and validate our user
    User.findOne({ username }, (err, user) => {
      // System error
      if (err) { return done(err); }
      // Validate username/password
      if (!user || !user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect username/password' });
      }
      // If they made it here, they're good
      return done(null, user);
    });
  }));
};
