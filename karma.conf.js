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
    files: [vendor, 'node_modules/angular-mocks/angular-mocks.js', applicationFile, fileGlob, jsonGlob],

    // list of files to exclude
    exclude: [
    ],
    client: {
      captureConsole: true,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // Improve error reporting and timeouts
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    captureTimeout: 60000,

    // web server port
    port: 9876,

    preprocessors: {
      [fileGlob]: ['webpack'],
      [jsonGlob]: ['webpack'],
      [applicationFile]: ['webpack', 'coverage']
    },
    webpack: webpackConfig({test: true}),
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    // enable / disable colors in the output (reporters addnd logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: process.env.CI ? config.LOG_INFO : config.LOG_WARN,

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
      subdir: '.'
    },

    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });

  // Add global error handlers for better error reporting
  if (process.env.CI) {
    const originalEmit = process.emit;
    process.emit = function(event, error) {
      if (event === 'uncaughtException' || event === 'unhandledRejection') {
        console.error('\n========================================');
        console.error(`Caught ${event}:`);
        console.error('Error:', error);
        if (error && error.message) {
          console.error('Message:', error.message);
        }
        if (error && error.stack) {
          console.error('Stack:', error.stack);
        }
        // Handle AggregateError
        if (error && error.errors && Array.isArray(error.errors)) {
          console.error('\n=== Aggregated Errors ===');
          error.errors.forEach((e, i) => {
            console.error(`\n--- Error ${i + 1} ---`);
            console.error('Message:', e.message || e);
            if (e.stack) {
              console.error('Stack:', e.stack);
            }
          });
        }
        console.error('========================================\n');
      }
      return originalEmit.apply(this, arguments);
    };
  }
};
