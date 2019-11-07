'use strict';
// 3rd party dependencies
require('dotenv').config();
const express = require('express');
const pg = require('pg');

// application constants
const app = express();
const PORT = process.env.PORT;

// DB setup
const client = new pg.Client(process.env.DATABASE_URL);
client.on('err', err => {throw err;});

app.get('/', (req, res) => {
  res.status(200).json({ name: 'brian '});
});

// GET  localhost:3000/add?first=brian&last=nations
app.get('/add', (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;
  let SQL = 'INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING *';
  let safeValues = [firstName, lastName];
  client.query(SQL, safeValues)
  .then( results => {
    res.status(200).json(results);
  })
  .catch( err => console.error(err));
});

app.get('/people', (req, res) => {
  let SQL = 'SELECT * FROM people';
  client.query(SQL)
    .then( results => {
      res.status(200).json(results.rows);
    })
    .catch( err => console.err(err));
})

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })
  .catch(err => {
    throw `PG startup error ${err.message}`
  })