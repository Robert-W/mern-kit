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
    db: 'mongodb://mongo/mern',
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  },

  webpack: {
    progress: true,
    profile: true,
    output: {
      path: path.join(process.cwd(), 'public'),
      filename: '[name].[hash].js'
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': '"production"'}}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
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
