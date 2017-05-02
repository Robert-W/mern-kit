/**
* @name exports
* @static
* @summary Test environment configurations
*/
module.exports = {

  port: 3000,

  mongo: {
    db: `mongodb://${process.env.MONGO_HOSTNAME}/docker-mern-test`,
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  }

};
