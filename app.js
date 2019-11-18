// const validator = require("validator");
// console.log(validator.isURL(""));
const { addNote, removeNote, listNotes, readNote } = require("./notes");

const yargs = require("yargs");

//customize yargs version
yargs.version("1.1.0");

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler: function(argv) {
        addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: "remove",
    describe: "Remove an existing note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler: function(argv) {
        removeNote(argv.title);
    }
});

yargs.command({
    command: "list",
    describe: "list all the notes",
    handler: function() {
        listNotes();
    }
});

yargs.command({
    command: "read",
    describe: "read an existing note",
    handler: function(argv) {
        readNote(argv.title);
    }
});
//add,remove,read,list
yargs.parse();