# note-taker-cli
A simple and intuitive command-line note-taking app built with Node.js.

## Installation
```bash
npm install -g note-taker-cli
```

## Usage
You can use the CLI with the `note` command after global installation.
* Add a note
```bash
note add --title="Shopping List" --body="Buy milk and eggs"
```
* Or add (a note) with aliases
```bash
note add -t "Shopping List" -b "Buy milk and eggs"
```
* Remove a note
```bash
note remove --title="Shopping List"
```
* Remove all notes
```bash
note clear-all
```
* List all notes
```bash
note list
```
* Read a note
```bash
note read --title="Shopping List"
```

## Features
* Create, read, list, delete, and delete all notes.
* Input validation for all the commands.
* Colored output.
* CLI built using `yargs`.
* Data stored in a local `notes.json` file.