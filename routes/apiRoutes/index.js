const router = require('express').Router();
const { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const newNote = req.body
    newNote.id = notes.length.toString();
    notes.push(newNote)
    res.json(newNote);
});
module.exports = router;