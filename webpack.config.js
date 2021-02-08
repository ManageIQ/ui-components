"use strict";
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const spa = require('browser-sync-spa');

module.exports = (env) => {
  let production = env && env.NODE_ENV === 'production';
  let test = env && env.test;

  const appEntry = {
    'ui-components': [
      './src/styles/ui-components.scss',
      './src/index.ts',
      './src/dialog-user/index.ts',
      './src/miq-select/index.ts',
      './src/tree-selector/index.ts',
      './src/tree-view/index.ts',
    ],

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
      name: 'ui-components',
      filename: 'js/ui-components.min.js',
    }) : undefined,
    new ExtractTextPlugin('css/[name].css'),
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
      path: __dirname + '/dist',
      publicPath: '.',
      filename: 'js/[name]' + (production ? '.min.js' : '.js'),
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
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'tslint-loader',
          enforce: 'pre',
          options: {emitErrors: true},
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader',
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'raw-loader',
        },
        {
          test: /\.scss/,
          exclude: /node_modules/,
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
        server: {baseDir: [__dirname + '/dist']},
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
      '__': '__',
    },
    watchOptions: {
      ignored: ['**/.*.sw[po]'],
    },
  };
};
