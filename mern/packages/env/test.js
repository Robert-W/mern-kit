/**
* @name exports
* @static
* @summary Test environment configurations
*/
module.exports = {

  port: 3000,

  mongo: {
    db: 'mongodb://mongo/mern-test',
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  }

};
