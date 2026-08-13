
/* eslint-env node */
const webpackConfig = require('./webpack.config');
const fileGlob = 'src/**/*.spec.[jt]s';
const vendor = 'dist/js/vendor.js';
const applicationFile = 'dist/js/ui-components.js';
const jsonGlob = {pattern: 'src/**/*.json', watched: true, served: true, included: false};

const testWebpackConfig = webpackConfig({test: true});
// Remove devServer from the test webpack config — not needed for karma
delete testWebpackConfig.devServer;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // list of files / patterns to load in the browser
    files: [vendor, 'node_modules/angular-mocks/angular-mocks.js', applicationFile, fileGlob, jsonGlob],

    // list of files to exclude
    exclude: [
    ],
    client: {
      captureConsole: true,
    },

    // test results reporter to use
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    preprocessors: {
      [fileGlob]: ['webpack'],
      [applicationFile]: ['coverage'],
    },
    webpack: testWebpackConfig,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    browsers: ['jsdom'],

    // Continuous Integration mode
    singleRun: true,
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.',
    },

    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
