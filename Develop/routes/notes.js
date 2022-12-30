const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../fsutils');
const { v4: uuidv4 } = require('uuid');



let data = require('../db/db.json');

notes.get('/', (req, res) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, '../db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    }
        
});  

module.exports = notes;

