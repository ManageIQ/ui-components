const settings = require('./application-settings.js');
const production = process.argv.indexOf('--production') !== -1;

var webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  path = require('path'),
  plugins = [
      !production ? undefined : new webpack.optimize.CommonsChunkPlugin(
        /* chunkName= */"vendor",
        /* filename= */settings.javascriptFolder + "/vendor.js"),
      new CopyWebpackPlugin([
        {from: __dirname + '/libs', to: settings.javascriptFolder + '/libs'}
      ])
    ].filter(p => !!p);

module.exports = {
  context: __dirname,
  entry: {
    vendor: ["angular", "lodash", "ui-router", "rx", "rx-angular"]
  },
  plugins: plugins,
  output: {
    path: settings.outputFolder,
    publicPath: '.',
    filename: 'js/vendor.js'
  }
};
