#!/usr/bin/env node

// Wrapper script to run Karma with better error handling for AggregateError
const { spawn } = require('child_process');

// Set up global error handlers before starting Karma
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

  // Handle AggregateError specifically
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

  // Handle AggregateError specifically
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

// Start Karma
const karma = spawn('karma', ['start'], {
  stdio: 'inherit',
  shell: true
});

karma.on('error', (error) => {
  console.error('\n========================================');
  console.error('=== Karma Process Error ===');
  console.error('========================================');
  console.error('Error:', error);

  if (error && error.message) {
    console.error('\nMessage:', error.message);
  }

  if (error && error.stack) {
    console.error('\nStack trace:');
    console.error(error.stack);
  }

  console.error('\n========================================\n');
  process.exit(1);
});

karma.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`\nKarma exited with code ${code}${signal ? ` (signal: ${signal})` : ''}`);
  }
  process.exit(code || 0);
});

// Made with Bob
