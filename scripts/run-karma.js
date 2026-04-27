#!/usr/bin/env node

// Wrapper script to run Karma with better error handling for AggregateError

// Patch process.stderr.write to intercept all error output
const originalStderrWrite = process.stderr.write.bind(process.stderr);
let capturedOutput = '';

process.stderr.write = function(chunk, encoding, callback) {
  const str = chunk.toString();
  capturedOutput += str;

  // Check if we see "AggregateError" being written
  if (str.includes('AggregateError')) {
    originalStderrWrite('\n========================================\n');
    originalStderrWrite('=== AggregateError Detected in stderr ===\n');
    originalStderrWrite('========================================\n');
    originalStderrWrite('Recent output:\n');
    originalStderrWrite(capturedOutput.slice(-2000)); // Last 2000 chars
    originalStderrWrite('\n========================================\n');
    originalStderrWrite('Attempting to extract error details...\n');

    // Try to get more info from the process
    if (global.process && global.process._events) {
      originalStderrWrite('Process event listeners:\n');
      originalStderrWrite(JSON.stringify(Object.keys(global.process._events), null, 2));
      originalStderrWrite('\n');
    }

    originalStderrWrite('========================================\n\n');
  }

  return originalStderrWrite(chunk, encoding, callback);
};

// Patch console.error
const originalConsoleError = console.error;
console.error = function(...args) {
  const firstArg = args[0];

  // Check for AggregateError string
  if (firstArg === 'AggregateError' || (typeof firstArg === 'string' && firstArg.includes('AggregateError'))) {
    originalConsoleError('\n========================================');
    originalConsoleError('=== AggregateError Detected ===');
    originalConsoleError('========================================');
    originalConsoleError('Arguments passed to console.error:', args);
    originalConsoleError('Number of arguments:', args.length);

    // Check all arguments for error objects
    args.forEach((arg, i) => {
      originalConsoleError(`\nArgument ${i}:`, typeof arg, arg);
      if (arg && typeof arg === 'object') {
        originalConsoleError('Keys:', Object.keys(arg));
        if (arg.errors) {
          originalConsoleError('Has errors property:', Array.isArray(arg.errors), arg.errors);
        }
      }
    });

    originalConsoleError('\nStack trace at console.error call:');
    originalConsoleError(new Error().stack);
    originalConsoleError('========================================\n');
  }

  return originalConsoleError.apply(console, args);
};

// Set up global error handlers with maximum verbosity
process.on('unhandledRejection', (error, promise) => {
  console.error('\n========================================');
  console.error('=== Unhandled Promise Rejection ===');
  console.error('========================================');
  console.error('Error type:', error ? error.constructor.name : typeof error);
  console.error('Error:', error);
  console.error('Promise:', promise);

  if (error) {
    console.error('\nError properties:');
    console.error('- message:', error.message);
    console.error('- stack:', error.stack);
    console.error('- name:', error.name);

    if (error.errors) {
      console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
      error.errors.forEach((e, i) => {
        console.error(`\n--- Error ${i + 1} ---`);
        console.error('Type:', e.constructor ? e.constructor.name : typeof e);
        console.error('Message:', e.message || e.toString());
        console.error('Code:', e.code);
        console.error('Syscall:', e.syscall);
        console.error('Errno:', e.errno);
        console.error('Stack:', e.stack);
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
    console.error('- stack:', error.stack);
    console.error('- name:', error.name);

    if (error.errors) {
      console.error('\n=== Aggregated Errors (' + error.errors.length + ' total) ===');
      error.errors.forEach((e, i) => {
        console.error(`\n--- Error ${i + 1} ---`);
        console.error('Type:', e.constructor ? e.constructor.name : typeof e);
        console.error('Message:', e.message || e.toString());
        console.error('Code:', e.code);
        console.error('Syscall:', e.syscall);
        console.error('Errno:', e.errno);
        console.error('Stack:', e.stack);
      });
    }
  }

  console.error('========================================\n');
  process.exit(1);
});

// Enable all Node.js warnings
process.on('warning', (warning) => {
  console.warn('Node.js Warning:', warning.name, warning.message);
  console.warn('Stack:', warning.stack);
});

// Start Karma
const karma = require('karma');
const Server = karma.Server;

console.log('Starting Karma with enhanced error reporting...');

const server = new Server({
  configFile: require('path').resolve(__dirname, '../karma.conf.js'),
  singleRun: true
}, (exitCode) => {
  console.log('\n========================================');
  console.log('Karma exited with code:', exitCode);
  console.log('========================================\n');
  process.exit(exitCode);
});

server.start();

// Made with Bob
