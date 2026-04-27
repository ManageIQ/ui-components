#!/usr/bin/env node

// Wrapper script to run Karma with better error handling for AggregateError

// First, require browser-sync to ensure it's loaded
try {
  const browserSync = require('browser-sync');
  // Try to access the utils module through browser-sync's internals
  const utilsPath = require.resolve('browser-sync/dist/utils');
  const utils = require(utilsPath);

  // Patch defaultCallback
  const originalDefaultCallback = utils.defaultCallback;
  utils.defaultCallback = function(err) {
    if (err) {
      console.error('\n========================================');
      console.error('=== Error in browser-sync (PATCHED) ===');
      console.error('========================================');
      console.error('Error type:', err.constructor ? err.constructor.name : typeof err);
      console.error('Error message:', err.message);

      if (err.stack) {
        console.error('\nStack trace:');
        console.error(err.stack);
      }

      // Check for AggregateError
      if (err.errors && Array.isArray(err.errors)) {
        console.error('\n========================================');
        console.error('=== Aggregated Errors (' + err.errors.length + ' total) ===');
        console.error('========================================');
        err.errors.forEach((e, i) => {
          console.error(`\n--- Error ${i + 1} of ${err.errors.length} ---`);
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
          if (e.path) {
            console.error('Path:', e.path);
          }
          if (e.address) {
            console.error('Address:', e.address);
          }
          if (e.port) {
            console.error('Port:', e.port);
          }
          if (e.stack) {
            console.error('\nStack trace:');
            console.error(e.stack);
          }
        });
        console.error('\n========================================');
      }

      // Show all error properties
      console.error('\nAll error properties:');
      Object.keys(err).forEach(key => {
        if (key !== 'stack' && key !== 'errors' && key !== 'message') {
          console.error(`- ${key}:`, err[key]);
        }
      });
      console.error('========================================\n');
    }

    // Call original
    return originalDefaultCallback.call(this, err);
  };

  console.log('Successfully patched browser-sync defaultCallback');
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
    console.log('\nKarma exited with code:', exitCode);
  }
  process.exit(exitCode);
});

server.start();

// Made with Bob
