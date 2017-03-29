const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineStylePlugin = require('./utils/InlineStylePlugin');
const assets = require('./assets');
const config = require('./config');
const path = require('path');
const glob = require('glob');

// Grab all the webpack.config.js files
const configs = glob.sync(assets.build).map(conf => require(path.resolve(conf)));

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

// Add environment specific rules that need to get values from configs
const rules = [];
const excludes = [];
// Add some goodies for production
if (process.env.NODE_ENV === 'production') {
  // For each criticalStyle configuration, add some plugins
  criticalStyles.forEach(filename => {
    const regex = new RegExp(`${filename}$`);
    config.webpack.plugins.unshift(new ExtractTextPlugin(filename));
    excludes.push(regex);
    // Add Extract Text plugin loader
    rules.push({
      test: regex,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { minimize: true }},
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      })
    });
  });
  // Add Inline Style Plugin, callback get's invoked each time a compilation is matched
  // Add the filename and source to the asset map
  config.compiledAssets.css = {};
  config.webpack.plugins.unshift(new InlineStylePlugin(/\.scss$/, (name, source) => {
    config.compiledAssets.css[name] = source;
  }));
}

// Add loader for javascript
rules.push({
  test: /\.js?$/,
  loaders: 'babel-loader',
  exclude: /(node_modules|build)/
});

// Add Sass Loader
rules.push({
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
  exclude: excludes
});

module.exports = Object.assign({}, config.webpack, {
  module: {
    rules
  },
  entry: entries,
  resolve: {
    alias: aliases
  }
});
