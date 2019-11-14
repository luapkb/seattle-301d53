'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');
require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT || 3001;

// set up database
const client = new pg.Client(process.env.DATABASE_URL);

// set up some routes
app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.post('/books', createBook);
app.get('/books/:id', getBook);

function getBook(request, response){
  // gotes to DB
  // gets book from DB based off of ID
}

function createBook(request, response){
  let { title, author, isbn, image_url, description } = request.body;

  // save book to database
  let sql = 'INSERT INTO books (title, author, isbn, image_url, desciption, bookshelf) VALUES ($1, $2, $3, $4, $5, $6);'

  let safeValues = [title, author, isbn, image_url, description];

  // select that book back from the DB with the id
  client.query(sql, safeValues)
    .then(() => {
      sql = 'SELECT * FROM books WHERE isbn = $1;'
      safeValues = [request.body.isbn];

      client.query(sql, safeValues)
        .then((result) => {
          response.redirect(`/books/${result.rows[0].id}`)
        })
    })
  // render the detail page of the book that was saved
    // after we save the book to the DB
    // select * from books where isbn = request.body.isbn
      // then redirect to /books/${result.rows[0].id}
}

function newSearch(request, response){
  // renders the search form 'pages/searches/new'
}

function createSearch(request, response){
  // using the form data, search google books 
  // make super agent call
    // map over the results
    // render the 'pages/searches/show' pages
  let url = `https://www.googleapis.com/books/v1/volumes?q=`;

  if(request.body.search[1] === 'title'){url += `intitle:${request.body.search[0]}`;}
  if(request.body.search[1] === 'author'){url += `inauthor:${request.body.search[0]}`;}

  superagent.get(url)
    .then(apiResponses => {
      let results = apiResponses.body.items.map(bookResult => new bookResult(bookResult.volumeInfo))

      response.render('pages/searches/show', {results:results});
    })
}

function getBooks(request, response){
  // check the DB
  // get all the books
  // display them
  // if there are no books in teh DB
    // render the new search page 'pages/searches/new'
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listen on ${PORT}`);
    })
  })