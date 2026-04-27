// Patch for karma-jsdom-launcher to provide better error reporting
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  const module = originalRequire.apply(this, arguments);

  // Patch karma-jsdom-launcher
  if (id === 'karma-jsdom-launcher') {
    const originalLauncher = module['launcher:jsdom'][1];

    module['launcher:jsdom'][1] = function(baseBrowserDecorator, config) {
      const instance = originalLauncher.call(this, baseBrowserDecorator, config);

      // Wrap the _start method to add error handling
      const originalStart = instance._start;
      instance._start = function(url) {
        const jsdom = require('jsdom');

        if (jsdom.JSDOM) {
          const jsdomOptions = {
            resources: "usable",
            runScripts: "dangerously"
          };

          if (config && config.jsdom) {
            Object.assign(jsdomOptions, config.jsdom);
          }

          // Wrap the fromURL call with proper error handling
          const promise = jsdom.JSDOM.fromURL(url, jsdomOptions);

          if (promise && promise.catch) {
            promise.catch(error => {
              console.error('\n========================================');
              console.error('=== Error in jsdom.JSDOM.fromURL ===');
              console.error('========================================');
              console.error('URL:', url);
              console.error('Error:', error);

              if (error && error.message) {
                console.error('\nMessage:', error.message);
              }

              if (error && error.stack) {
                console.error('\nStack trace:');
                console.error(error.stack);
              }

              // Handle AggregateError
              if (error && error.errors && Array.isArray(error.errors)) {
                console.error('\n========================================');
                console.error('=== Aggregated Errors (' + error.errors.length + ' total) ===');
                console.error('========================================');
                error.errors.forEach((e, i) => {
                  console.error(`\n--- Error ${i + 1} of ${error.errors.length} ---`);
                  console.error('Type:', e.constructor ? e.constructor.name : typeof e);
                  console.error('Message:', e.message || e.toString());
                  if (e.code) {
                    console.error('Code:', e.code);
                  }
                  if (e.syscall) {
                    console.error('Syscall:', e.syscall);
                  }
                  if (e.errno) {
                    console.error('Errno:', e.errno);
                  }
                  if (e.stack) {
                    console.error('Stack trace:');
                    console.error(e.stack);
                  }
                });
              }

              console.error('\n========================================\n');

              // Re-throw to maintain normal error flow
              throw error;
            });
          }

          return promise;
        } else {
          // Old jsdom API
          return originalStart.call(this, url);
        }
      };

      return instance;
    };

    module['launcher:jsdom'][1].$inject = originalLauncher.$inject;
  }

  return module;
};

module.exports = {};

// Made with Bob
