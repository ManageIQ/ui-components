/* eslint-env node */
const settings = require('./application-settings.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: settings.stylesheetPath,
    }),
  ];

  return {
    mode: 'development',
    context: __dirname,
    entry: {
      vendor: ['./src/vendor.ts', settings.sassRootFolder + '/vendor.scss'],
    },
    plugins: plugins,
    resolve: {
      alias: {
        // @brickhouse-tech/angular-lts (aliased as "angular") bundles these AngularJS modules
        'angular-animate$': require.resolve('angular/angular-animate.js'),
        'angular-sanitize$': require.resolve('angular/angular-sanitize.js'),
      },
    },
    module: {
      rules: [
        {enforce: 'pre', test: /\.ts?$/, loader: 'tslint-loader', exclude: /(node_modules|libs)/},
        {
          test: require.resolve('jquery'),
          loader: 'expose-loader',
          options: {exposes: ['$', 'jQuery']},
        },
        {test: /\.ts$/, loader: 'ts-loader', exclude: /(node_modules|libs)/},
        {test: /\.html$/, loader: 'raw-loader', exclude: /(node_modules|libs|dist|tsd)/},
        {
          test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
          type: 'asset',
          parser: {dataUrlCondition: {maxSize: 20480}},
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
      publicPath: '../',
      filename: 'js/[name].js',
    },
  };
};
