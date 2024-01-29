const express = require('express');
const path = require('path');
const noteData = require('./db/db.json')
const PORT = 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
 res.json(noteData) 
})

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
    let response;

  // Check if there is anything in the response body
  if (req.body.title && req.body.text) {
    response = {
      title: req.body.title,
      text: req.body.text,
    };
    res.status(201).json(response);
  } else {
    res.status(400).json('Request body must at least contain a title and content.');
  }

  // Log the response body to the console
  console.log(req.body);
});


app.listen(PORT, () => {
    console.log(`Notes application listening at http://localhost:${PORT}`)
})