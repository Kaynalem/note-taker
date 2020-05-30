const router = require('express').Router();
const { notes } = require('../../db/db');

router.get('/api/notes', (req, res) => {
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    notes.push(req.body)
    res.json(req.body);
});
module.exports = router;