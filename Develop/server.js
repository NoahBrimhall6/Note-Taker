const express = require('express');
const notes = require('./db/db.json');

const app = express();

const PORT = 3001;

// routes - what happens when some client sends a GET for '/'
app.get('/', (req, res) => {
  // respond with all the users in the DB (json)
  res.json(notes);
});

// set up listener
app.listen(PORT, () => 
  console.log(`Up and running at ${PORT}`)
);