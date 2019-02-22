"use strict";
const settings = require('./application-settings.js');
const webpack = require('webpack'),
  path = require('path'),
  NgAnnotatePlugin = require('ng-annotate-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  spa = require('browser-sync-spa');

module.exports = (env) => {
  let production = env && env.NODE_ENV === 'production';
  let test = env && env.test;

  const appEntry = {
    [settings.appName]: [
      settings.sassEntryPoint,
      settings.tsEntryPoint,
    ].concat(settings.tsModules),

    'demo-app': [
      './demo/index.ts',
      './demo/styles/demo-app.scss',
    ],
  };

  const plugins = [
    new CopyWebpackPlugin([
      {from: __dirname + '/demo/data', to: 'data'},
      {from: __dirname + '/demo/assets', to: 'assets'},
    ]),
    new HtmlWebpackPlugin({
      title: 'ManageIQ Common Components',
      template: 'demo/template-index.ejs', // Load a custom template
      inject: 'body',
    }),
    production ? new webpack.optimize.CommonsChunkPlugin({
      name: settings.appName,
      filename: settings.javascriptFolder + '/' + settings.appName + settings.isMinified(production),
    }) : undefined,
    new ExtractTextPlugin(settings.stylesheetPath),
    new NgAnnotatePlugin({add: true}),
    production ? new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      minimize: true,
      drop_console: true,
    }) : undefined,
  ].filter(p => !!p);

  return {
    context: __dirname,
    entry: appEntry,
    output: {
      path: settings.outputFolder,
      publicPath: '.',
      filename: settings.javascriptFolder + "/[name]" + settings.isMinified(production),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    stats: {
      colors: true,
      reasons: true,
    },
    devtool: !production && 'source-map',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: /(node_modules|libs)/,
          loader: 'tslint-loader',
          enforce: 'pre',
          options: {emitErrors: true},
        },
        {
          test: /\.ts$/,
          exclude: /(node_modules|libs)/,
          loader: 'awesome-typescript-loader',
        },
        {
          test: /\.html$/,
          exclude: /(node_modules|libs|dist|tsd)/,
          loader: 'raw-loader',
        },
        {
          test: /\.scss/,
          exclude: /(node_modules|lib)/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader',
          }),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader',
          }),
        },
        {
          test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
          loader: 'url-loader?limit=20480',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
    plugins: [
      ...plugins,
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 4000,
        server: {baseDir: [__dirname + settings.distFolder]},
        open: !test,
        middleware: [
          {
            route: "/data",
            handle: function (req, res, next) {
              req.method = 'GET';
              return next();
            },
          },
        ],
      }, {
        use: spa({
          selector: '[ng-app]',
        }),
      }),
    ],
    externals: {
      'angular': 'angular',
      'lodash': '_',
      'numeral': 'numeral',
      '__': '__',
    },
    watchOptions: {
      ignored: ['**/.*.sw[po]'],
    },
  };
};
