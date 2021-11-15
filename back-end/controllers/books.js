const Book = require('../models/book.model');
const getBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(400).json('Error ' + err));
};

const addBook = (req, res) => {
  const bookId = Number(req.body.bookId);
  const bookTitle = req.body.bookTitle;
  const bookDescription = req.body.bookDescription;
  const deleted = false;
  const newBook = new Book({
    bookId,
    bookTitle,
    bookDescription,
    deleted,
  });
  newBook
    .save()
    .then(() => res.json('Book Added!'))
    .catch((err) => res.status(400).json('Error ' + err));
};

const editBook = (req, res) => {
  Book.findByIdAndUpdate(req.body.id, req.body.data, function (err, res) {
    if (err) {
      res.status(400).send('error in editing book', err);
    } else {
      (res) => res.status(200).send('book edited successfully ', res);
    }
  });
};

module.exports = { getBooks, addBook, editBook };
