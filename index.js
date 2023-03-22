const express = require('express');
const app = express();
let port = 3000;

const books = require('./data/books');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

app.use('/assets', express.static('./client/assets'));
app.use('/pages', express.static('./client/pages'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
  
app.get('/book', (req, res) => {
  res.sendFile(__dirname + '/client/pages/listBooks.html');
});

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/addBook', (req, res) => {
  res.sendFile(__dirname + '/client/pages/addBook.html');
});

app.get('/editBook/:id', (req, res) => {
  res.sendFile(__dirname + '/client/pages/editBook.html');
});

app.post('/books', (req, res) => {
  let newBook = req.body;
  newBook._id = uuidv4();
  books.push(newBook);
  res.sendStatus(200);
});

app.delete('/books/:id', (req, res) => {
  let id = req.params.id;
  let index = _.findIndex(books, (o) => {
    return o._id == id;
  });
  books.splice(index, 1);
  res.sendStatus(200);
});

app.get('/books/:id', (req, res) => {
  let id = req.params.id;
  let book = _.find(books, (o) => {
    return o._id == id;
  });
  res.send(book);
});

app.put('/books/:id', (req, res) => {
  let id = req.params.id;
  let index = _.findIndex(books, (o) => {
    return o._id == id;
  });
  books[index] = req.body;
  res.sendStatus(200);
});