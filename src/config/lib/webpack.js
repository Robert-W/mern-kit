const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const logger = require('./winston');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require(path.resolve('./config/webpack.config'));
const config = require(path.resolve('./config/config'));

/**
* @name createAssetMap
* @summary create a map of compiled assets
* @param {object} stats - compilation stats from webpack
* @return {object} asset map
*/
const createAssetMap = stats => Object.keys(stats.assetsByChunkName).reduce((chunks, name) => {
  const asset = stats.assetsByChunkName[name];
  chunks[name] = (typeof asset !== 'string') ? asset[0] : asset;
  return chunks;
}, {});

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
    config.assets = createAssetMap(stats);
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
    config.assets = createAssetMap(statistics.toJson());
    resolve();
  });
});

module.exports = {
  setupDevMiddleware,
  compileProductionAssets
};
