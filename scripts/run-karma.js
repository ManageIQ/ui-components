#!/usr/bin/env node

// Wrapper script to run Karma with better error handling for AggregateError

// Store the last error object we see
let lastErrorObject = null;

// Patch console.error to capture error objects BEFORE they're logged
const originalConsoleError = console.error;
console.error = function(...args) {
  const firstArg = args[0];

  // Store any error objects we see
  if (firstArg instanceof Error) {
    lastErrorObject = firstArg;
  }

  // Check for AggregateError string (which is err.message from browser-sync)
  if (firstArg === 'AggregateError' || (typeof firstArg === 'string' && firstArg.includes('AggregateError'))) {
    originalConsoleError('\n========================================');
    originalConsoleError('=== AggregateError Detected ===');
    originalConsoleError('========================================');

    // Check if we have the actual error object
    if (lastErrorObject) {
      originalConsoleError('Captured error object:');
      originalConsoleError('- Type:', lastErrorObject.constructor.name);
      originalConsoleError('- Message:', lastErrorObject.message);

      if (lastErrorObject.stack) {
        originalConsoleError('\nStack trace:');
        originalConsoleError(lastErrorObject.stack);
      }

      // Check for aggregated errors
      if (lastErrorObject.errors && Array.isArray(lastErrorObject.errors)) {
        originalConsoleError('\n========================================');
        originalConsoleError('=== Aggregated Errors (' + lastErrorObject.errors.length + ' total) ===');
        originalConsoleError('========================================');
        lastErrorObject.errors.forEach((e, i) => {
          originalConsoleError(`\n--- Error ${i + 1} of ${lastErrorObject.errors.length} ---`);
          originalConsoleError('Type:', e.constructor ? e.constructor.name : typeof e);
          originalConsoleError('Message:', e.message || e.toString());
          if (e.code) {
            originalConsoleError('Code:', e.code);
          }
          if (e.syscall) {
            originalConsoleError('Syscall:', e.syscall);
          }
          if (e.errno) {
            originalConsoleError('Errno:', e.errno);
          }
          if (e.path) {
            originalConsoleError('Path:', e.path);
          }
          if (e.address) {
            originalConsoleError('Address:', e.address);
          }
          if (e.port) {
            originalConsoleError('Port:', e.port);
          }
          if (e.stack) {
            originalConsoleError('\nStack trace:');
            originalConsoleError(e.stack);
          }
        });
        originalConsoleError('\n========================================');
      }

      // Show all properties of the error
      originalConsoleError('\nAll error properties:');
      Object.keys(lastErrorObject).forEach(key => {
        if (key !== 'stack' && key !== 'errors') {
          originalConsoleError(`- ${key}:`, lastErrorObject[key]);
        }
      });
    } else {
      originalConsoleError('No error object was captured before this message.');
      originalConsoleError('The error was logged as a string only.');
    }

    originalConsoleError('\nCall stack where console.error was invoked:');
    originalConsoleError(new Error().stack);
    originalConsoleError('========================================\n');
  }

  return originalConsoleError.apply(console, args);
};

// Patch Error constructor to capture all errors as they're created
const OriginalError = global.Error;
global.Error = function(...args) {
  const err = new OriginalError(...args);
  if (err.message && err.message.includes('AggregateError')) {
    lastErrorObject = err;
  }
  return err;
};
global.Error.prototype = OriginalError.prototype;

// Set up global error handlers
process.on('unhandledRejection', (error, promise) => {
  lastErrorObject = error;
  console.error('\n========================================');
  console.error('=== Unhandled Promise Rejection ===');
  console.error('========================================');
  console.error('Error type:', error ? error.constructor.name : typeof error);
  console.error('Error:', error);

  if (error) {
    console.error('\nError properties:');
    console.error('- message:', error.message);
    console.error('- name:', error.name);

    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }

    if (error.errors && Array.isArray(error.errors)) {
      console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
      error.errors.forEach((e, i) => {
        console.error(`\n--- Error ${i + 1} ---`);
        console.error('Type:', e.constructor ? e.constructor.name : typeof e);
        console.error('Message:', e.message || e.toString());
        console.error('Code:', e.code);
        console.error('Syscall:', e.syscall);
        console.error('Errno:', e.errno);
        if (e.stack) {
          console.error('Stack:', e.stack);
        }
      });
    }
  }

  console.error('========================================\n');
});

process.on('uncaughtException', (error, origin) => {
  lastErrorObject = error;
  console.error('\n========================================');
  console.error('=== Uncaught Exception ===');
  console.error('========================================');
  console.error('Origin:', origin);
  console.error('Error type:', error ? error.constructor.name : typeof error);
  console.error('Error:', error);

  if (error) {
    console.error('\nError properties:');
    console.error('- message:', error.message);
    console.error('- name:', error.name);

    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }

    if (error.errors && Array.isArray(error.errors)) {
      console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
      error.errors.forEach((e, i) => {
        console.error(`\n--- Error ${i + 1} ---`);
        console.error('Type:', e.constructor ? e.constructor.name : typeof e);
        console.error('Message:', e.message || e.toString());
        console.error('Code:', e.code);
        console.error('Syscall:', e.syscall);
        console.error('Errno:', e.errno);
        if (e.stack) {
          console.error('Stack:', e.stack);
        }
      });
    }
  }

  console.error('========================================\n');
  process.exit(1);
});

// Start Karma
const karma = require('karma');
const Server = karma.Server;

console.log('Starting Karma with enhanced error reporting...');

const server = new Server({
  configFile: require('path').resolve(__dirname, '../karma.conf.js'),
  singleRun: true
}, (exitCode) => {
  if (exitCode !== 0) {
    console.log('\n========================================');
    console.log('Karma exited with code:', exitCode);
    if (lastErrorObject) {
      console.log('\nLast error object captured:');
      console.log(lastErrorObject);
    }
    console.log('========================================\n');
  }
  process.exit(exitCode);
});

server.start();

// Made with Bob
