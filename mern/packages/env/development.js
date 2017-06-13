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
    db: `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`,
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
      })
    ]
  }
};
