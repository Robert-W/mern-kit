const CompilationCallbackPlugin = require('utils/CompilationCallbackPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const definePluginEnv = require('./webpack.env');
const config = require('config/config');
const webpack = require('webpack');
const path = require('path');

// Grab all the build.config.js files
const configs = config.client.build;

// Merge all the entries together
const entries = configs.reduce((all, conf) => Object.assign(all, conf.webpack.entry), {});

// Merge all the aliases together
const aliases = configs.reduce((all, conf) => Object.assign(all, conf.webpack.alias), {});

// Get a list of critical css files to load, filter out any undefineds or empty strings
const criticalStyles = configs
  .filter(conf => conf.build && conf.build.criticalStyle) // Remove any elements without a criticalStyle setting
  .map(conf => conf.build.criticalStyle);

// Resolve their paths
for (const key in entries) { entries[key] = path.resolve(entries[key]); }
for (const key in aliases) { aliases[key] = path.resolve(aliases[key]); }

/**
* @summary Make a webpack config for whatever environment/purpose needed
* @param {Object} options
* @param {Boolean} options.prerender - If the config will be used for prerendering
*/
module.exports = (options = {}) => {
  const { prerender } = options;
  // Add environment specific rules that need to get values from configs
  const excludes = [];
  const plugins = [];
  const rules = [];
  // Add some production specific plugins
  if (process.env.NODE_ENV === 'production') {
    // Some of these plugin won't work when server rendering since we need to require them in node
    // Only add ExtractTextPlugin and CommonsChunkPlugin if we're not server rendering
    if (!prerender) {
      // Add an ExtractTextPlugin for each critical style we want to inline
      criticalStyles.forEach(filename => {
        const regex = new RegExp(`${filename}$`);
        plugins.push(new ExtractTextPlugin(filename));
        excludes.push(regex);
        // Add Extract Text plugin loader
        rules.push({
          test: regex,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { minimize: true }},
              { loader: 'postcss-loader', options: {
                config: { path: path.resolve('./packages/config/postcss.config.js') }}
              },
              { loader: 'sass-loader' }
            ]
          })
        });
      });
      // Add the compilation callback plugin to save the critical css for later
      plugins.push(new CompilationCallbackPlugin((name, asset) => {
        // Add SASS bundles to our compiledAssets as raw source
        if (/\.scss$/.test(name)) {
          config.compiledAssets.css[name] = asset.source();
        }
      }));
      // Add the CommonsChunkPlugin
      plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.[hash].js'
      }));
    }
  }

  // Add babel loader for javascript
  rules.push({
    test: /\.js?$/,
    loaders: 'babel-loader',
    exclude: /(node_modules|build)/
  });

  // Add Sass loaders
  const sassLoaders = ['css-loader', 'postcss-loader', 'sass-loader'];
  // Only add the `style-loader` if not server rendering because it is made for the browser
  if (!prerender) { sassLoaders.unshift('style-loader'); }

  rules.push({
    test: /\.scss$/,
    loaders: sassLoaders,
    exclude: excludes
  });

  // Add some variables to webpack
  plugins.push(new webpack.DefinePlugin(definePluginEnv()));

  // Merge in the preconfigured webpack plugins
  const allPlugins = config.webpack && config.webpack.plugins
    ? plugins.concat(config.webpack.plugins)
    : plugins;

  return Object.assign({}, config.webpack, {
    plugins: allPlugins,
    module: { rules },
    entry: entries,
    resolve: {
      alias: aliases
    }
  });
};
