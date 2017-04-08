/**
* Custom Plugin to take inline css and place it in our asset map
* @param {Function} callback - callback for receiving asset and chunk name
*/
function CompilationCallbackPlugin (callback) {
  this.callback = callback;
}

CompilationCallbackPlugin.prototype.apply = function (compiler) {
  // This fires when the code starts compiling
  compiler.plugin('emit', (compilation, done) => {
    Object.keys(compilation.assets).forEach(key => {
      const asset = compilation.assets[key];
      if (asset) {
        this.callback(key, asset);
      }
    });
    done();
  });
};

module.exports = CompilationCallbackPlugin;
