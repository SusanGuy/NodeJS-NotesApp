const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(item => item.title === title);
    debugger;
    if (duplicateNote) {
        console.log(chalk.red.inverse("Title Already Taken"));
    } else {
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("note added"));
    }
};

const removeNote = title => {
    const notes = loadNotes();
    const noteToRemove = notes.find(item => item.title === title);

    if (noteToRemove) {
        saveNotes(notes.filter(item => item !== noteToRemove));
        console.log(chalk.green.inverse("Note Removed"));
    } else {
        console.log(chalk.redBright.inverse("No note found"));
    }
};

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const listNotes = () => {
    const data = loadNotes();
    if (data.length !== 0) {
        console.log(chalk.yellowBright("Listing all the Notes :-"));
        data.forEach(element => {
            console.log(chalk.blueBright.italic(element.title));
        });
    } else {
        console.log(chalk.cyanBright.inverse("No notes added yet"));
    }
};

const readNote = title => {
    const data = loadNotes();

    const printData = data.find(item => item.title === title);
    printData
        ?
        console.log(chalk.bgBlueBright.inverse(printData.body)) :
        console.log(chalk.bgRedBright.inverse("No notes found with that title"));
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};