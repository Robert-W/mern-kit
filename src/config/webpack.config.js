const CompilationCallbackPlugin = require('./utils/CompilationCallbackPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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

// Do the same for components that should be prerendered
// const componentsToRender = configs
//   .filter(conf => conf.build && conf.build.prerender)
//   .map(conf => conf.build.prerender);

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
  // Add the compilation callback plugin
  config.compiledAssets.css = {};
  config.webpack.plugins.unshift(new CompilationCallbackPlugin((name, asset) => {
    // Add SASS bundles to our compiledAssets as raw source
    if (/\.scss$/.test(name)) {
      config.compiledAssets.css[name] = asset.source();
    }
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
