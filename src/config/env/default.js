/**
* @name exports
* @static
* @summary Default environment configurations
*/
module.exports = {

  port: 3000,

  app: {
    author: 'Robert-W <https://github.com/Robert-W>',
    title: 'Mern-Kit',
    keywords: 'Mongo, Mongoose, Express, React, Redux, Node, Docker, GraphQL, Pug',
    description: 'Sample boilerplate for a MERN stack running inside a docker container.'
  },

  mongo: {
    db: 'mongodb://mongo/docker-mern',
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  },

  passwordRequirements: {
    length: 8,
    rules: [
      { regex: /[A-Z]/, description: 'Uppercase letter' },
      { regex: /[a-z]/, description: 'Lowercase letter' },
      { regex: /[0-9]/, description: 'Number' },
      { regex: /\W/, description: 'Symbol' }
    ]
  },

  auth: {
    trustProxy: true,
    strategy: 'local',
    collection: 'sessions',
    secret: 'asDas34DR42liji!$asdfa@asdf',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  },

  webpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.js?$/,
          loaders: 'babel-loader',
          exclude: /(node_modules|build)/
        }
      ]
    }
  }

};
