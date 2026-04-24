#!/usr/bin/env node

// Wrapper script to run Karma with better error handling for AggregateError
const karma = require('karma');
const Server = karma.Server;

// Patch console.error to catch AggregateError messages
const originalConsoleError = console.error;
console.error = function(...args) {
  // Check if this is an AggregateError being logged
  const firstArg = args[0];
  if (firstArg && (firstArg.constructor && firstArg.constructor.name === 'AggregateError' ||
                   (typeof firstArg === 'object' && firstArg.errors))) {
    originalConsoleError.call(console, '\n========================================');
    originalConsoleError.call(console, '=== AggregateError Detected ===');
    originalConsoleError.call(console, '========================================');
    originalConsoleError.call(console, 'Error:', firstArg);

    if (firstArg.message) {
      originalConsoleError.call(console, '\nMessage:', firstArg.message);
    }

    if (firstArg.stack) {
      originalConsoleError.call(console, '\nStack trace:');
      originalConsoleError.call(console, firstArg.stack);
    }

    if (firstArg.errors && Array.isArray(firstArg.errors)) {
      originalConsoleError.call(console, '\n========================================');
      originalConsoleError.call(console, '=== Aggregated Errors (' + firstArg.errors.length + ' total) ===');
      originalConsoleError.call(console, '========================================');
      firstArg.errors.forEach((e, i) => {
        originalConsoleError.call(console, `\n--- Error ${i + 1} of ${firstArg.errors.length} ---`);
        originalConsoleError.call(console, 'Type:', e.constructor ? e.constructor.name : typeof e);
        originalConsoleError.call(console, 'Message:', e.message || e.toString());
        if (e.code) {
          originalConsoleError.call(console, 'Code:', e.code);
        }
        if (e.stack) {
          originalConsoleError.call(console, 'Stack trace:');
          originalConsoleError.call(console, e.stack);
        }
      });
      originalConsoleError.call(console, '\n========================================\n');
    }
  }

  // Call original console.error
  return originalConsoleError.apply(console, args);
};

// Set up global error handlers
process.on('unhandledRejection', (error) => {
  console.error('\n========================================');
  console.error('=== Unhandled Promise Rejection ===');
  console.error('========================================');
  console.error('Error:', error);

  if (error && error.message) {
    console.error('\nMessage:', error.message);
  }

  if (error && error.stack) {
    console.error('\nStack trace:');
    console.error(error.stack);
  }

  if (error && error.errors && Array.isArray(error.errors)) {
    console.error('\n========================================');
    console.error('=== Aggregated Errors ===');
    console.error('========================================');
    error.errors.forEach((e, i) => {
      console.error(`\n--- Error ${i + 1} of ${error.errors.length} ---`);
      console.error('Message:', e.message || e.toString());
      if (e.stack) {
        console.error('Stack trace:');
        console.error(e.stack);
      }
    });
  }

  console.error('\n========================================\n');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('\n========================================');
  console.error('=== Uncaught Exception ===');
  console.error('========================================');
  console.error('Error:', error);

  if (error && error.message) {
    console.error('\nMessage:', error.message);
  }

  if (error && error.stack) {
    console.error('\nStack trace:');
    console.error(error.stack);
  }

  if (error && error.errors && Array.isArray(error.errors)) {
    console.error('\n========================================');
    console.error('=== Aggregated Errors ===');
    console.error('========================================');
    error.errors.forEach((e, i) => {
      console.error(`\n--- Error ${i + 1} of ${error.errors.length} ---`);
      console.error('Message:', e.message || e.toString());
      if (e.stack) {
        console.error('Stack trace:');
        console.error(e.stack);
      }
    });
  }

  console.error('\n========================================\n');
  process.exit(1);
});

// Start Karma server
const server = new Server({
  configFile: require('path').resolve(__dirname, '../karma.conf.js'),
  singleRun: true
}, (exitCode) => {
  console.log('Karma has exited with code', exitCode);
  process.exit(exitCode);
});

server.start();

// Made with Bob
