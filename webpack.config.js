'use strict';
/* eslint-env node */
const path = require('path');
const settings = require('./application-settings.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const production = env && env.NODE_ENV === 'production';
  const test = env && env.test;

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
    new CopyWebpackPlugin({
      patterns: [
        {from: path.join(__dirname, '/demo/data'), to: 'data'},
        {from: path.join(__dirname, '/demo/assets'), to: 'assets'},
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'ManageIQ Common Components',
      template: 'demo/template-index.ejs',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: settings.stylesheetPath,
    }),
  ];

  return {
    mode: production ? 'production' : 'development',
    context: __dirname,
    entry: appEntry,
    output: {
      path: settings.outputFolder,
      publicPath: '/',
      filename: settings.javascriptFolder + '/[name]' + settings.isMinified(production),
      environment: {
        arrowFunction: false,
        const: false,
      },
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    stats: {
      colors: true,
      reasons: true,
    },
    devtool: ! production && 'source-map',
    optimization: production ? {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {drop_console: true},
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: settings.appName,
            chunks: 'all',
          },
        },
      },
    } : {},
    devServer: ! test ? {
      static: {
        directory: path.join(__dirname, settings.distFolder),
      },
      host: 'localhost',
      port: 4000,
      open: true,
      setupMiddlewares: (middlewares, devServer) => {
        devServer.app.get('/data/{*path}', (req, _res, next) => {
          req.method = 'GET';
          return next();
        });
        return middlewares;
      },
    } : {},
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
          loader: 'ts-loader',
          options: {transpileOnly: true, compilerOptions: {removeComments: false}},
        },
        {
          test: /\.html$/,
          exclude: /(node_modules|libs|dist|tsd)/,
          loader: 'raw-loader',
        },
        {
          test: /\.scss/,
          exclude: /(node_modules|lib)/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
          type: 'asset/inline',
          parser: {dataUrlCondition: {maxSize: 20480}},
        },
      ],
    },
    plugins: plugins,
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
