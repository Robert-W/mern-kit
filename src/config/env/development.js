/**
* @name exports
* @static
* @summary Development environment configurations
*/
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

module.exports = {

  port: 3000,

  mongo: {
    db: 'mongodb://mongo/docker-mern',
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  },

  webpack: {
    devtool: 'source-map',
    cache: true,
    output: {
      path: path.join(process.cwd(), 'public'),
      filename: '[name].[hash].js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer]
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"development"'
        }
      })
    ]
  }
};
