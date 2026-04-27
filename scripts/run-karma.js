#!/usr/bin/env node

// Load the karma-jsdom-launcher patch first
require('./karma-jsdom-launcher-patch');

// Wrapper script to run Karma with better error handling for AggregateError
const karma = require('karma');
const Server = karma.Server;

// Store reference to any errors we see
let lastError = null;

// Patch console.error to catch AggregateError messages
const originalConsoleError = console.error;
console.error = function(...args) {
  // Check if this is an AggregateError being logged
  const firstArg = args[0];

  // Check if it's the string "AggregateError"
  if (firstArg === 'AggregateError' || (typeof firstArg === 'string' && firstArg.includes('AggregateError'))) {
    originalConsoleError.call(console, '\n========================================');
    originalConsoleError.call(console, '=== AggregateError Detected (String) ===');
    originalConsoleError.call(console, '========================================');
    originalConsoleError.call(console, 'Karma logged:', firstArg);

    // Try to find the actual error object
    if (lastError) {
      originalConsoleError.call(console, '\nLast captured error:');
      originalConsoleError.call(console, lastError);

      if (lastError.message) {
        originalConsoleError.call(console, '\nMessage:', lastError.message);
      }

      if (lastError.stack) {
        originalConsoleError.call(console, '\nStack trace:');
        originalConsoleError.call(console, lastError.stack);
      }

      if (lastError.errors && Array.isArray(lastError.errors)) {
        originalConsoleError.call(console, '\n========================================');
        originalConsoleError.call(console, '=== Aggregated Errors (' + lastError.errors.length + ' total) ===');
        originalConsoleError.call(console, '========================================');
        lastError.errors.forEach((e, i) => {
          originalConsoleError.call(console, `\n--- Error ${i + 1} of ${lastError.errors.length} ---`);
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
      }
    } else {
      originalConsoleError.call(console, '\nNo error object was captured. The error may have been thrown in a way that bypassed our handlers.');
      originalConsoleError.call(console, 'This typically happens in the karma-jsdom-launcher during browser initialization.');
    }
    originalConsoleError.call(console, '\n========================================\n');
  }
  // Check if it's an AggregateError object
  else if (firstArg && (firstArg.constructor && firstArg.constructor.name === 'AggregateError' ||
                   (typeof firstArg === 'object' && firstArg.errors))) {
    lastError = firstArg;
    originalConsoleError.call(console, '\n========================================');
    originalConsoleError.call(console, '=== AggregateError Detected (Object) ===');
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
  // Store any error objects we see
  else if (firstArg instanceof Error) {
    lastError = firstArg;
  }

  // Call original console.error
  return originalConsoleError.apply(console, args);
};

// Set up global error handlers
process.on('unhandledRejection', (error) => {
  lastError = error;
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
  lastError = error;
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
  if (exitCode !== 0) {
    console.log('\n========================================');
    console.log('Karma exited with code', exitCode);
    if (lastError) {
      console.log('Last error captured:', lastError);
    }
    console.log('========================================\n');
  }
  process.exit(exitCode);
});

// Capture errors from the server
server.on('run_complete', (browsers, results) => {
  if (results.error) {
    console.error('\n========================================');
    console.error('=== Karma Run Complete with Errors ===');
    console.error('========================================');
    console.error('Results:', results);
    console.error('========================================\n');
  }
});

server.start();

// Made with Bob
