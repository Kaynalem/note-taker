const path = require('path');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

/*HTML routes*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
//displays saved notes JSON array
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

/*API routes*/
app.get('/api/notes', (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(savedNotes);
});

app.post('/api/notes', (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNote = req.body;
    const noteID = (savedNotes.length).toString();
    newNote.id = noteID;
    savedNotes.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
    console.log('New note saved to db.json: ', newNote);
    res.json(savedNotes);
})

app.delete('/api/notes/:id', (req, res) => {
    var savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const noteID = req.params.id;

    console.log(`Deleted note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
    res.json(savedNotes);
})
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});