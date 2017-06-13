const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

/**
* @name exports
* @static
* @summary Production environment configurations
*/
module.exports = {

  port: 3000,

  mongo: {
    db: `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`,
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  },

  webpack: {
    profile: true,
    output: {
      path: path.join(process.cwd(), 'public'),
      filename: '[name].[hash].js'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer]
        }
      })
    ]
  }

};
