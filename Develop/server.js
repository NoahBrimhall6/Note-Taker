const express = require('express');
const notes = require('./db/db.json');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes - what happens when some client sends a GET for '/'
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(notes)
);

app.post('/api/notes', (req, res) => {
  var response = {
    status: 'success',
    data: req.body,
  };
  res.status(201).json(response);
  
  console.log(req.body);
});

// set up listener
app.listen(PORT, () => 
  console.log(`Up and running at http://localhost:${PORT}`)
);