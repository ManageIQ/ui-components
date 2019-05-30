const settings = require('./application-settings.js');
const production = process.argv.indexOf('--production') !== -1;

var webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  path = require('path'),
  plugins = [
      !production ? undefined : new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "angular": "angular",
        "_": "lodash"
      }),
      new ExtractTextPlugin(settings.stylesheetPath)
    ].filter(p => !!p);

module.exports = {
  context: __dirname,
  entry: {
    vendor: ['./src/vendor.ts', settings.sassRootFolder + '/vendor.scss']
  },
  plugins: plugins,
  module: {
    rules: [
      {enforce: 'pre', test: /\.ts?$/, loader: 'tslint-loader', exclude: /(node_modules|libs)/},
      { test: require.resolve('jquery'), loader: 'expose-loader?jQuery!expose-loader?$' },
      {test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /(node_modules|libs)/},
      {test: /\.html$/, loader: 'raw-loader', exclude: /(node_modules|libs|dist|tsd)/},
      {test: /\.(png|jpg|gif|svg|woff|ttf|eot)/, loader:  'url-loader?limit=20480'},
      // stylesheets
      {test: /\.scss/, exclude: /(node_modules|lib)/, loader: ExtractTextPlugin.extract(
        {
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        }
      )},
      {test: /\.css$/, loader: ExtractTextPlugin.extract(
        {
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        }
      )},
      { test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/, loader: 'url-loader?limit=100000' },
      {test: /\.json$/,  loader: 'json-loader'}
    ]
  },
  output: {
    path: settings.outputFolder,
    publicPath: '.',
    filename: 'js/[name].js'
  }
};
