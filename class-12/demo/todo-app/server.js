'use strict';

require('dotenv').config();

const express = require('express');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.set('view engine', 'ejs');

// API Routes
app.get('/', getTasks) // get all tasks
app.get('/tasks/:task_id', getOneTask); // get a single task
app.get('/add', showForm); // show form to add a task
app.post('/add', addTask); // create a new task

function getTasks(req, res) {
  let SQL = 'SELECT * FROM tasks;';

  return client.query(SQL)
    .then( results => res.render('index', { results: results.rows }))
    .catch( err => console.error(err));
}

function getOneTask(req, res) {
  let SQL = 'SELECT * FROM tasks WHERE id=$1;';
  let values = [req.params.task_id];

  return client.query(SQL, values)
    .then( result => {
      return res.render('pages/detail-view', { task: result.rows[0] });
    })
    .catch( err => console.error(err));
}

function showForm(req, res) {
  res.render('./pages/add-view');
}

function addTask(req, res) {
  console.log('addTask()', req.body);
  let {title, description, category, contact, status} = req.body;
  let SQL = 'INSERT into tasks(title, description, category, contact, status) VALUES ($1, $2, $3, $4, $5);';
  let values = [title, description, category, contact, status];

  return client.query(SQL, values)
    .then(res.redirect('/'))
    .catch( err => console.error(err));
}

app.listen(PORT, () => {
  console.log(`listening on cool port num: ${PORT}`);
});