const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    vendor: [
      './src/vendor.ts',
      './src/vendor.scss',
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
  ],
  module: {
    rules: [
      {enforce: 'pre', test: /\.ts?$/, loader: 'tslint-loader', exclude: /node_modules/},
      { test: require.resolve('jquery'), loader: 'expose-loader?jQuery!expose-loader?$' },
      {test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/},
      {test: /\.(png|jpg|gif|svg|woff|ttf|eot)/, loader:  'url-loader?limit=20480'},
      // stylesheets
      {test: /\.scss/, exclude: /node_modules/, loader: ExtractTextPlugin.extract(
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
    path: __dirname + '/dist',
    publicPath: '.',
    filename: 'js/[name].js',
  },
};
