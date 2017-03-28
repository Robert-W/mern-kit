const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const logger = require('../lib/winston');
const config = require('../config');
const webpack = require('webpack');

/**
* @name generateAssetMap
* @summary create a map of compiled assets
* @param {object} stats - compilation stats from webpack
* @return {object} asset map
*/
const generateAssetMap = stats => Object.keys(stats.assetsByChunkName).reduce((chunks, name) => {
  const asset = stats.assetsByChunkName[name];
  chunks[name] = (typeof asset !== 'string') ? asset[0] : asset;
  return chunks;
}, {});

/**
* @name middleware
* @summary Start the dev task, update the assets in the config, and return the middleware
* @return {Object}
*/
const middleware = () => {
  // Create our compiler
  const compiler = webpack(webpackConfig);
  // WHen the compiler completes, update our assets and log any issues
  compiler.plugin('done', statistics => {
    const stats = statistics.toJson();
    // Check for soft errors or warnings
    if (stats.errors.length) {
      logger.error('Compilation errors from webpack', stats.errors);
    } else if (stats.warnings.length) {
      logger.warn('Compilation warnings from webpack', stats.warnings);
    } else {
      logger.info('Webpack compilation complete, updating asset map now');
      config.compiledAssets.js = generateAssetMap(stats);
      console.log(config.compiledAssets.js);
    }
  });

  return {
    dev: webpackDevMiddleware(compiler, { stats: { colors: true }}),
    hot: webpackHotMiddleware(compiler)
  };
};

/**
* @name compileAssets
* @summary Compile our javascript assets for production
* @return {Promise}
*/
const compileAssets = () => new Promise((resolve, reject) => {
  const compiler = webpack(webpackConfig);
  // Apply the progress plugin
  compiler.apply(new webpack.ProgressPlugin((percent, message) => {
    logger.info(`${Math.floor(percent * 100)}% ${message.toString()}`);
  }));

  logger.info('\x1B[1mStarting build script\x1B[22m');
  logger.info('---------------------');

  compiler.run((err, statistics) => {
    if (err) { return reject(err); }
    // Format our stats
    logger.info(statistics.toString({
      errorDetails: true,
      warnings: true,
      chunks: false,
      colors: true
    }));

    logger.info('\x1B[1mWebpack bundling has completed\x1B[22m');
    logger.info('------------------------------');
    // Update our asset map
    config.compiledAssets.js = generateAssetMap(statistics.toJson());
    resolve();
  });
});

/**
* @name prerenderComponents
* @summary Prerender our components and add them to the asset map
* @return {Promise}
*/
const prerenderComponents = () => new Promise((resolve, _) => {
  resolve();
});

/**
* @name compileProductionAssets
* @summary Compile and pre-render all assets for production
* @return {Promise}
*/
const compileProductionAssets = () => Promise.all([
  compileAssets(),
  prerenderComponents()
]);

module.exports = {
  compileProductionAssets,
  middleware
};
