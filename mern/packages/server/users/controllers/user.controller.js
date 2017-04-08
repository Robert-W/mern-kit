const logger = require('lib/winston');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
* @function login
* @summary login the user to the request
* @param {User} user
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
const login = function login (user, req, res) {
  req.login(user, err => {
    if (err) {
      logger.error('req.login failed', err);
      res.status(400).send({ status: 'error', message: err.message });
    }
    res.status(200).json({ status: 'success' });
  });
};

/**
* @function authenticateAndLogin
* @summary Authenticate the user and then log them in
* @param {String} strategy - Strategy to use
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
* @param {Function} next - Next middleware
*/
const authenticateAndLogin = function authenticateAndLogin (strategy, req, res, next) {
  passport.authenticate(strategy, (error, user, info) => {
    if (error || !user) {
      logger.error('User authentication failed', { error, user, info });
      res.status(400).send(info);
    } else {
      // Maybe do some password expiration checks if desired
      login(user, req, res);
    }
  })(req, res, next);
};

/**
* @function signout
* @summary sign the user out
* @name exports.signout
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.signout = (req, res) => {
  req.logout();
  res.redirect('/');
};

/**
* @function signin
* @summary sign the user to the in
* @name exports.signin
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
* @param {Function} next - next middleware
*/
exports.signin = (req, res, next) => {
  authenticateAndLogin('local', req, res, next);
};

/**
* @function signup
* @summary create a new user and then log them in
* @name exports.signup
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.signup = (req, res) => {
  const user = new User(User.makeCopy(res.body));
  user.save(err => {
    if (err) {
      logger.error('Failed to create a user account', err);
      res.status(400).send(err);
    } else {
      login(user, req, res);
    }
  });
};

/**
* @function forgot
* @summary send the user a link to reset their password
* @name exports.forgot
* @static
* @param {Express.Request} req - Express request object
* @param {Express.Response} res - Express response object
*/
exports.forgot = (req, res) => {
  res.end('Feature coming soon');
};
