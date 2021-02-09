const webpackConfig = require('./webpack.config');
const fileGlob = 'src/**/*.spec.[jt]s';
const vendor = 'dist/js/vendor.js';
const applicationFile = 'dist/js/ui-components.js';
const jsonGlob = {pattern: 'src/**/*.json', watched: true, served: true, included: false};

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      vendor,
      'node_modules/angular-mocks/angular-mocks.js',
      applicationFile,
      fileGlob,
      jsonGlob,
    ],

    // list of files to exclude
    exclude: [
    ],
    client: {
      captureConsole: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    preprocessors: {
      [fileGlob]: ['webpack'],
      [jsonGlob.pattern]: ['webpack'],
      [applicationFile]: ['webpack', 'coverage'],
    },
    webpack: webpackConfig({test: true}),
    webpackMiddleware: {noInfo: true},

    // enable / disable colors in the output (reporters addnd logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['jsdom'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    coverageReporter : {
      type : 'lcov',
      dir : 'coverage/',
      subdir: '.',
    },

    mime: {
      'text/x-typescript': ['ts'],
    },
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
};
