const express = require('express');
const path = require('path');
const noteData = require('./db/db.json')
const PORT = process.env.PORT || 3001
const app = express();
const fs = require('fs/promises')
const uuid = require('./helper/uuid')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Defines /notes endpoint to bring user to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(noteData)
})

//POST call updates notes after user submits them
app.post('/api/notes', async (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    let response;

    // Check if there is anything in the response body
    if (req.body.title && req.body.text) {
        response = {
            title: req.body.title,
            text: req.body.text,
            id: uuid()
        };
        try {
            const currentNotesContent = await fs.readFile('./db/db.json', 'utf8');
            const currentNotes = JSON.parse(currentNotesContent);

            currentNotes.push(response);

            await fs.writeFile('./db/db.json', JSON.stringify(currentNotes, null, 2));

            noteData.push(response);

            res.status(201).json(response);
        } catch {
            res.status(400).json('Request body must at least contain a title and content.');
        }
    };
})

//DELETE call that removes a note based on the requested ID
app.delete('/api/notes/:id', (req, res) => {
    const delRequest = req.params.id

    for (let i = 0; i < noteData.length; i++)
        if (noteData[i].id === delRequest) {
            noteData.splice(i, 1);
        }
        
    fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 2))
        .then(() => {
            res.json({ message: 'Note deleted successfully', deletedNoteId: delRequest });
        })
        .catch(error => {
            console.error('Error updating file:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})

//server activation method
app.listen(PORT, () => {
    console.info(`Notes application listening at http://localhost:${PORT}`)
})