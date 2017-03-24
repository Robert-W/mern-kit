const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const util = require(path.resolve('./config/utils/model.utils'));
const config = require(path.resolve('./config/config'));
const name = 'User';

// Invalid password string
const rules = config.passwordRequirements.rules.map(rule => rule.description);
const invalidPasswordMessage = `Password must be at least ${config.passwordRequirements.length}` +
  ` characters long and meet the following requirements: ${rules.join(', ')}`;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [util.validators.isNotEmpty, 'Please provide a first name.']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [util.validators.isNotEmpty, 'Please provide a last name.']
  },
  username: {
    required: 'Please provide a username.',
    type: String,
    trim: true,
    validate: [util.validators.isUnique('User', 'username'), 'That username is already taken.']
  },
  password: {
    type: String,
    default: '',
    validate: [util.validators.isValidPassword, invalidPasswordMessage]
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    trim: true,
    default: '',
    validate: [util.validators.isUnique('User', 'email'), 'That email address is already taken.'],
    match: [/.+\@.+\..+/, 'Please provide a valid email address']
  },
  salt: {
    type: String
  }
});

/**
* Set up a text-search index
*/

UserSchema.index({
  username: 'text',
  email: 'text'
});

/**
* Lifecycle hooks
*/

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password, this.salt);
  }
  next();
});

/**
* Instance methods
*/

UserSchema.methods.hashPassword = function hashPassword (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function authenticate (password) {
  return this.password === this.hashPassword(password, this.salt);
};

/**
* Static methods
*/

UserSchema.statics.makeCopy = function makeCopy (user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    created: user.created,
    updated: user.updated,
    email: user.email
  };
};

/**
* Register the model
*/
mongoose.model(name, UserSchema, name);
