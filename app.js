#!/usr/bin/env node

// app.js
const notes = require('./notes.js');
const yargs = require('yargs');
const chalk = require('chalk');

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, // Required
      type: 'string',
      alias: 't',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
      alias: 'b',
    },
  },
  handler(argv) {
    if (argv.title.length > 0 && argv.body.length > 0) {
      notes.addNote(argv.title, argv.body);
    } else {
      console.log(chalk.red.bold('Both the title and body must be non-empty!'));
    }
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
      alias: 't',
    },
  },
  handler(argv) {
    if (argv.title.length > 0) {
      notes.removeNote(argv.title);
    } else {
      console.log(chalk.red.bold('Title must be non-empty!'));
    }
  },
});

// Create clear-all command
yargs.command({
  command: 'clear-all',
  describe: 'Clear all notes',
  handler() {
    notes.removeAllNotes();
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
      alias: 't',
    },
  },
  handler(argv) {
    if (argv.title.length > 0) {
      notes.readNote(argv.title);
    } else {
      console.log(chalk.red.bold('Title must be non-empty!'));
    }
  },
});

yargs.parse(); // Go through all the configuration