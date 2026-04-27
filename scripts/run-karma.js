#!/usr/bin/env node

// Wrapper script to run Karma with enhanced error reporting
// This script was created to debug sporadic AggregateError failures in CI.
// Root cause identified: BrowserSyncPlugin was trying to connect to port 4000
// which would timeout or be refused in CI environments.
// Fix: Disabled BrowserSyncPlugin when running tests (see webpack.config.js)

// Set up global error handlers for any remaining issues
process.on('unhandledRejection', (error, promise) => {
  console.error('\n========================================');
  console.error('=== Unhandled Promise Rejection ===');
  console.error('========================================');
  console.error('Error type:', error ? error.constructor.name : typeof error);
  console.error('Error:', error);

  if (error && error.message) {
    console.error('Message:', error.message);
  }

  if (error && error.stack) {
    console.error('\nStack trace:');
    console.error(error.stack);
  }

  if (error && error.errors && Array.isArray(error.errors)) {
    console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
    error.errors.forEach((e, i) => {
      console.error(`\n--- Error ${i + 1} ---`);
      console.error('Type:', e.constructor ? e.constructor.name : typeof e);
      console.error('Message:', e.message || e.toString());
      if (e.code) console.error('Code:', e.code);
      if (e.syscall) console.error('Syscall:', e.syscall);
      if (e.address) console.error('Address:', e.address);
      if (e.port) console.error('Port:', e.port);
      if (e.stack) {
        console.error('Stack:', e.stack);
      }
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
  console.error('Error:', error);

  if (error && error.message) {
    console.error('Message:', error.message);
  }

  if (error && error.stack) {
    console.error('\nStack trace:');
    console.error(error.stack);
  }

  if (error && error.errors && Array.isArray(error.errors)) {
    console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
    error.errors.forEach((e, i) => {
      console.error(`\n--- Error ${i + 1} ---`);
      console.error('Type:', e.constructor ? e.constructor.name : typeof e);
      console.error('Message:', e.message || e.toString());
      if (e.code) console.error('Code:', e.code);
      if (e.syscall) console.error('Syscall:', e.syscall);
      if (e.address) console.error('Address:', e.address);
      if (e.port) console.error('Port:', e.port);
      if (e.stack) {
        console.error('Stack:', e.stack);
      }
    });
  }

  console.error('========================================\n');
  process.exit(1);
});

// Start Karma
const karma = require('karma');
const Server = karma.Server;

const server = new Server({
  configFile: require('path').resolve(__dirname, '../karma.conf.js'),
  singleRun: true
}, (exitCode) => {
  process.exit(exitCode);
});

server.start();

// Made with Bob
