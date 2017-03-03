const winston = require('winston');

/**
* @name exports
* @static
* @summary logger to use for the application
*/
module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: true,
      timestamp: true
    })
  ]
});
