#!/usr/bin/env node

// Wrapper script to run Karma with better error handling for AggregateError

// First, require browser-sync to ensure it's loaded
try {
  const utilsPath = require.resolve('browser-sync/dist/utils');
  const utils = require(utilsPath);

  // Patch the fail function to see what's being passed
  const originalFail = utils.fail;
  utils.fail = function(kill, errMessage, cb) {
    console.error('\n========================================');
    console.error('=== browser-sync fail() called ===');
    console.error('========================================');
    console.error('kill:', kill);
    console.error('errMessage type:', typeof errMessage);
    console.error('errMessage constructor:', errMessage ? errMessage.constructor.name : 'null');
    console.error('errMessage:', errMessage);
    console.error('errMessage.message:', errMessage ? errMessage.message : 'N/A');
    console.error('errMessage.errors:', errMessage ? errMessage.errors : 'N/A');

    if (errMessage && errMessage.errors && Array.isArray(errMessage.errors)) {
      console.error('\n=== THIS IS AN AGGREGATEERROR ===');
      console.error('Number of errors:', errMessage.errors.length);
      errMessage.errors.forEach((e, i) => {
        console.error(`\n--- Error ${i + 1} ---`);
        console.error('Type:', e.constructor ? e.constructor.name : typeof e);
        console.error('Message:', e.message || e.toString());
        console.error('Code:', e.code);
        console.error('Syscall:', e.syscall);
        console.error('Errno:', e.errno);
        console.error('Path:', e.path);
        console.error('Address:', e.address);
        console.error('Port:', e.port);
        if (e.stack) {
          console.error('Stack:', e.stack);
        }
      });
    }
    console.error('========================================\n');

    return originalFail.call(this, kill, errMessage, cb);
  };

  // Also patch defaultCallback
  const originalDefaultCallback = utils.defaultCallback;
  utils.defaultCallback = function(err) {
    if (err) {
      console.error('\n========================================');
      console.error('=== defaultCallback called ===');
      console.error('========================================');
      console.error('Error type:', err.constructor ? err.constructor.name : typeof err);
      console.error('Error message:', err.message);

      if (err.stack) {
        console.error('\nStack trace:');
        console.error(err.stack);
      }

      if (err.errors && Array.isArray(err.errors)) {
        console.error('\n=== Aggregated Errors (' + err.errors.length + ' total) ===');
        err.errors.forEach((e, i) => {
          console.error(`\n--- Error ${i + 1} ---`);
          console.error('Type:', e.constructor ? e.constructor.name : typeof e);
          console.error('Message:', e.message || e.toString());
          console.error('Code:', e.code);
          console.error('Syscall:', e.syscall);
          console.error('Errno:', e.errno);
          console.error('Path:', e.path);
          console.error('Address:', e.address);
          console.error('Port:', e.port);
          if (e.stack) {
            console.error('Stack:', e.stack);
          }
        });
      }
      console.error('========================================\n');
    }

    return originalDefaultCallback.call(this, err);
  };

  console.log('Successfully patched browser-sync fail() and defaultCallback()');
} catch (e) {
  console.log('Could not patch browser-sync:', e.message);
}

// Set up global error handlers
process.on('unhandledRejection', (error, promise) => {
  console.error('\n========================================');
  console.error('=== Unhandled Promise Rejection ===');
  console.error('========================================');
  console.error('Error type:', error ? error.constructor.name : typeof error);
  console.error('Error:', error);

  if (error && error.errors && Array.isArray(error.errors)) {
    console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
    error.errors.forEach((e, i) => {
      console.error(`\n--- Error ${i + 1} ---`);
      console.error('Message:', e.message || e.toString());
      console.error('Code:', e.code);
      console.error('Stack:', e.stack);
    });
  }

  console.error('========================================\n');
});

process.on('uncaughtException', (error, origin) => {
  console.error('\n========================================');
  console.error('=== Uncaught Exception ===');
  console.error('========================================');
  console.error('Origin:', origin);
  console.error('Error type:', error ? error.constructor.name : typeof error);

  if (error && error.errors && Array.isArray(error.errors)) {
    console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
    error.errors.forEach((e, i) => {
      console.error(`\n--- Error ${i + 1} ---`);
      console.error('Message:', e.message || e.toString());
      console.error('Code:', e.code);
      console.error('Stack:', e.stack);
    });
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
    console.log('\nKarma exited with code:', exitCode);
  }
  process.exit(exitCode);
});

server.start();

// Made with Bob
