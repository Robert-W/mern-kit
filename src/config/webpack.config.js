const assets = require('./assets');
const config = require('./config');
const path = require('path');
const glob = require('glob');

// Grab all the webpack.config.js files
const configs = glob.sync(assets.webpack).map(webpackConfig => require(path.resolve(webpackConfig)));

// Merge all the entries together
const entries = configs.reduce((all, webpackConfig) => Object.assign(all, webpackConfig.entry), {});

// Merge all the aliases together
const aliases = configs.reduce((all, webpackConfig) => Object.assign(all, webpackConfig.alias), {});

// Resolve their paths
for (const key of entries) { entries[key] = path.resolve(entries[key]); }
for (const key of aliases) { aliases[key] = path.resolve(aliases[key]); }

module.exports = Object.assign({}, config.webpack, {
  entry: entries,
  resolve: {
    alias: aliases
  }
});
