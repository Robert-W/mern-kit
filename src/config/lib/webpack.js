const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackUtils = require('../utils/webpack.utils');
const webpackConfig = require('../webpack.config');
const logger = require('../winston');
const config = require('../config');
const webpack = require('webpack');

/**
* @name setupDevMiddleware
* @summary Start the dev task, update the assets in the config, and return the middleware
* @return {Object}
*/
const setupDevMiddleware = () => {
  // Create out compiler
  const compiler = webpack(webpackConfig);
  // Start watching
  compiler.plugin('done', statistics => {
    const stats = statistics.toJson();
    // Check for soft errors
    if (stats && stats.errors && stats.errors.length) {
      logger.error('Soft compilation errors from webpack', stats.errors);
      return;
    }
    // Check for warnings
    if (stats && stats.warnings && stats.warnings.length) {
      logger.warn('Compilation warnings from webpack', stats.warnings);
      return;
    }
    // Update our asset map
    logger.info('Webpack compilation complete, updating asset map now');
    config.compiledAssets.js = webpackUtils.generateAssetMap(stats);
  });

  return {
    devMiddleware: webpackDevMiddleware(compiler, { stats: { colors: true }}),
    hotMiddleware: webpackHotMiddleware(compiler)
  };
};

/**
* @name compileProductionAssets
* @summary Compile our assets for production
* @return {Promise}
*/
const compileProductionAssets = () => new Promise((resolve, reject) => {
  const compiler = webpack(webpackConfig);
  // Output progress
  compiler.apply(new webpack.ProgressPlugin((percentage, message) => {
    logger.info(`${Math.floor(percentage * 100)}% ${message.toString()}`);
  }));

  logger.info('\x1B[1mStarting build script\x1B[22m');
  logger.info('---------------------');

  compiler.run((err, statistics) => {
    if (err) { return reject(err); }

    logger.info(statistics.toString({
      errorDetails: true,
      warnings: true,
      chunks: false,
      colors: true
    }));

    logger.info('\x1B[1mWebpack bundling has completed\x1B[22m');
    logger.info('------------------------------');

    // Update our asset map
    config.compiledAssets.js = webpackUtils.generateAssetMap(statistics.toJson());
    resolve();
  });
});

module.exports = {
  setupDevMiddleware,
  compileProductionAssets
};
