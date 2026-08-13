/* eslint-env node */
const settings = require('./application-settings.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const production = env && env.NODE_ENV === 'production';

  const plugins = [
    production ? new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'angular': 'angular',
      '_': 'lodash',
    }) : null,
    new MiniCssExtractPlugin({
      filename: settings.stylesheetPath,
    }),
  ].filter(Boolean);

  return {
    mode: production ? 'production' : 'development',
    context: __dirname,
    entry: {
      vendor: ['./src/vendor.ts', settings.sassRootFolder + '/vendor.scss'],
    },
    plugins: plugins,
    module: {
      rules: [
        {enforce: 'pre', test: /\.ts?$/, loader: 'tslint-loader', exclude: /(node_modules|libs)/},
        {
          test: require.resolve('jquery'),
          loader: 'expose-loader',
          options: {exposes: ['$', 'jQuery']},
        },
        {test: /\.ts$/, use: [{loader: 'ts-loader', options: {transpileOnly: true, compilerOptions: {removeComments: false}}}], exclude: /(node_modules|libs)/},
        {test: /\.html$/, loader: 'raw-loader', exclude: /(node_modules|libs|dist|tsd)/},
        {
          test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
          type: 'asset/inline',
          parser: {dataUrlCondition: {maxSize: 20480}},
        },
        {
          test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
          type: 'asset/inline',
          parser: {dataUrlCondition: {maxSize: 100000}},
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
      ],
    },
    output: {
      path: settings.outputFolder,
      publicPath: '.',
      filename: 'js/[name].js',
    },
  };
};
