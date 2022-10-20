const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 3001;
}

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// read file logic
var notes = [];
const updateNotes = () => {
  fs.readFile('./db/db.json', (err, data) => {
    if(err) {
      console.log("Error, Unable to read db.json: " + err);
    }
    notes = JSON.parse(data);
  });
  return notes;
};

// routes - what happens when some client sends a GET for '/'
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(updateNotes())
);

app.post('/api/notes', (req, res) => {
  var parsedNotes = updateNotes();
  
  var newNote = {
    "title": req.body.title,
    "text": req.body.text,
    "id": parsedNotes.length + 1
  };

  parsedNotes.push(newNote);

  // Write updated reviews back to the file
  fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
    (writeErr) => writeErr
        ? console.error('Unable to update db.json' + writeErr)
        : console.info('Successfully updated notes!')
  );

  res.json(newNote);
});

// set up listener
app.listen(PORT, () => 
  console.log(`Up and running at http://localhost:${PORT}`)
);