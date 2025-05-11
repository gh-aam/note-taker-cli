// notes.js
const fs = require('fs');
const path = require('path');

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
    console.log('New note added!');
  } else {
    console.log('Note title taken!');
  }
};

// Remove a note
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log('Note removed!');
  } else {
    console.log('No note found!');
  }
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
    console.log('No notes found!');
  }
};

// Read a note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  
  if (note) {
    console.log('Title: ' + note.title);
    console.log('Body: ' + note.body);
  } else {
    console.log('Note not found!');
  }
};

// Make some functions available for use in other files
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};