const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.bgYellow("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgYellow("Here is the list of notes:"));
  notes.forEach((note) =>
    console.log(chalk.yellow(note.id), chalk.green(note.title))
  );
}

async function updateNote(id, newTitle) {
  const notes = await getNotes();
  if (notes.find((note) => note.id === id.toString())) {
    notes.forEach((note) => {
      if ( note.id === id.toString() ) {
        note.title = newTitle
      }
    })
  }
  await fs.writeFile(notesPath, JSON.stringify(notes));

  console.log(chalk.green.bgYellow("Note was updated!"));
}
async function removeNotesById(id) {
  const notes = await getNotes();
  if (notes.find((note) => note.id === id.toString())) {
    const newNotes = notes.filter((note) => note.id !== id.toString());

    await fs.writeFile(notesPath, JSON.stringify(newNotes));
    console.log(chalk.red(`Note with id: ${id} - has been removed.`));
  } else {
    console.log(chalk.bgRed(`Note with id: ${id} - not found!`));
  }
}

module.exports = {
  addNote,
  getNotes,
  updateNote,
  removeNotesById
};
