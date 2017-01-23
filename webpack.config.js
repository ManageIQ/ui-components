"use strict";
const settings = require('./application-settings.js');
const webpack = require('webpack'),
  path = require('path'),
  production = process.env.NODE_ENV === 'production',
  NgAnnotatePlugin = require('ng-annotate-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  spa = require('browser-sync-spa'),
  plugins = [
    new CopyWebpackPlugin([
      {from: __dirname + '/demo/data', to: 'data'},
      {from: __dirname + '/demo/assets', to: 'assets'}
    ]),
    new HtmlWebpackPlugin({
      title: 'ManageIQ Common Components',
      template: 'demo/template-index.ejs', // Load a custom template
      inject: 'body'
    }),
    !production ? undefined : new webpack.optimize.CommonsChunkPlugin({
      name: settings.appName,
      filename: settings.javascriptFolder + '/' + settings.appName + settings.isMinified(production)
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 4000,
      server: {baseDir: [__dirname + settings.distFolder]}
    }, {
      use: spa({
        selector: '[ng-app]'
      })
    }),
    new webpack.ProvidePlugin({
      Rx: "rxjs"
    }),
    new ExtractTextPlugin(settings.stylesheetPath),
    new NgAnnotatePlugin({add: true})
  ].filter(p => !!p);

if(production){
  plugins.push(new webpack.optimize.UglifyJsPlugin({warnings: false, minimize: true, drop_console: true}));
}

let appEntry = {};
appEntry[settings.appName] = [
  settings.sassEntryPoint,
  settings.tsEntryPoint
].concat(settings.tsModules);
appEntry['demo-app'] = [
  './demo/index.ts',
  './demo/styles/demo-app.scss'
];

module.exports = {
  context: __dirname,
  entry: appEntry,
  output: {
    path: settings.outputFolder,
    publicPath: '.',
    filename: settings.javascriptFolder + "/[name]" + settings.isMinified(production)
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: {
    colors: true,
    reasons: true
  },
  devtool: !production && 'source-map',
  module: {
    rules: [
      {enforce: 'pre', test: /\.ts?$/, loader: 'tslint-loader', exclude: /(node_modules|libs)/},
      {test: /\.ts$/, loaders: ['ts-loader'], exclude: /(node_modules|libs)/},
      {test: /\.html$/, loader: 'raw-loader', exclude: /(node_modules|libs|dist|tsd)/},
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
      {test: /\.(png|jpg|gif|svg|woff|ttf|eot)/, loader:  'url-loader?limit=20480'},
      {test: /\.json$/,  loader: 'json-loader'}
    ]
  },
  plugins: plugins,
  externals: {
    'angular': 'angular',
    'lodash': '_'
  }
};
