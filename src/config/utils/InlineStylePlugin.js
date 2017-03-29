/**
* Custom Plugin to take inline css and place it in our asset map
* @param {String} filename - filename being extracted by ExtractTextPlugin
*/
function InlineStylePlugin (pattern, callback) {
  this.pattern = pattern || /.scss$/;
  this.callback = callback || function () {};
}

InlineStylePlugin.prototype.apply = function (compiler) {
  // This fires when the code starts compiling
  compiler.plugin('emit', (compilation, done) => {
    // const asset = compilation.assets[this.filename];
    Object.keys(compilation.assets).forEach(key => {
      const asset = compilation.assets[key];
      if (this.pattern.test(key) && asset) {
        this.callback(key, asset.source());
      }
    });
    done();
  });
};

module.exports = InlineStylePlugin;
