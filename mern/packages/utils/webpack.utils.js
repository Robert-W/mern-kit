const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const makeWebpackConfig = require('config/webpack.config');
const config = require('config/config');
const logger = require('lib/winston');
const webpack = require('webpack');
const path = require('path');

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
  const compiler = webpack(makeWebpackConfig());
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
      config.compiledAssets.js = Object.assign(config.compiledAssets.js, generateAssetMap(stats));
    }
  });

  return {
    dev: webpackDevMiddleware(compiler, { stats: { colors: true }}),
    hot: webpackHotMiddleware(compiler)
  };
};

/**
* @name createProductionBundles
* @summary Compile our javascript assets for production
* @return {Promise}
*/
const createProductionBundles = () => new Promise((resolve, reject) => {
  const compiler = webpack(makeWebpackConfig());
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
    // Update our asset map, Components and Inline Styles have already been added in webpack.config.js
    config.compiledAssets.js = Object.assign(config.compiledAssets.js, generateAssetMap(statistics.toJson()));
    resolve();
  });
});

/**
* @name prerenderComponents
* @summary Prerender our components and add them to the asset map
* @return {Promise}
*/
const prerenderComponents = () => new Promise((resolve, reject) => {
  // Get the entry points for all prerendered components
  const entries = config.client.build
    .filter(conf => conf.build && conf.build.prerender)
    .map(conf => conf.build.prerender)
    .reduce((all, conf) => Object.assign(all, conf), {});
  // Modify the webpack config with some new settings
  const webpackPrerenderConfig = Object.assign(makeWebpackConfig({ prerender: true }), {
    entry: entries
  });
  // Set the library target
  webpackPrerenderConfig.output.libraryTarget = 'commonjs2';

  logger.info('\x1B[1mStarting prerender script\x1B[22m');
  logger.info('-------------------------');
  // Create our compiler and run webpack
  const compiler = webpack(webpackPrerenderConfig);
  compiler.run((err, stats) => {
    if (err) { return reject(err); }
    logger.info('\x1B[1mCompiled components\x1B[22m');
    logger.info('-------------------');
    // Grab all the prerendered components from the public directory, if you change the output
    // for the production webpack config, this will need to read from the appropriate dir
    Object.keys(stats.compilation.assets).forEach(name => {
			// name is in format [name].[hash].js, save in assets as just name
			const key = name.replace(`.${stats.compilation.hash}.js`, '');
      config.compiledAssets.js[key] = require(path.resolve(`./public/${name}`));
    });

    logger.info('\x1B[1mSaving components\x1B[22m');
    logger.info('-----------------');
    resolve();
  });
});

/**
* @name compileAssets
* @summary Compile and pre-render all assets for production
* @return {Promise}
*/
const compileAssets = () => new Promise((resolve, reject) => {
  // If we are not in production, just resolve immediately
  if (process.env.NODE_ENV !== 'production') { return resolve(); }
  createProductionBundles()
    .then(() => prerenderComponents())
    .then(resolve)
    .catch(reject);
});

module.exports = {
  compileAssets,
  middleware
};
