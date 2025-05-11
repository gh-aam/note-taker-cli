// notes.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const notesFilePath = path.join(__dirname, 'notes.json');

// Load notes from notes.json
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(notesFilePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return []; // Return an empty array if the file doesn't exist or is empty
  }
};

// Save notes to notes.json
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(notesFilePath, dataJSON);
};

// Add a new note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green('New note added!'));
  } else {
    console.log(chalk.blue.bold('Note title taken!'));
  }
};

// Remove a note
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green('Note removed!'));
  } else {
    console.log(chalk.blue.bold('No note found!'));
  }
};

// Remove all notes
const removeAllNotes = () => {
  saveNotes([]);
  console.log(chalk.green('All notes removed!'));
};

// List all notes
const listNotes = () => {
  const notes = loadNotes();
  
  if (notes.length > 0) {
    console.log('Your notes:');
    notes.forEach((note) => {
      console.log('- ' + note.title);
    });
  } else {
    console.log(chalk.blue.bold('No notes found!'));
  }
};

// Read a note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  
  if (note) {
    console.log(chalk.yellow.bold('Title: ') + note.title);
    console.log(chalk.yellow.bold('Body: ') + note.body);
  } else {
    console.log(chalk.blue.bold('Note not found!'));
  }
};

// Make some functions available for use in other files
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  removeAllNotes: removeAllNotes,
  listNotes: listNotes,
  readNote: readNote,
};