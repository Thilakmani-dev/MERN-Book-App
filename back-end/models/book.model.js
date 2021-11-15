const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookId: {
      type: String,
      required: true,
      minlength: 3,
    },
    bookTitle: {
      type: String,
      required: true,
      minlength: 3,
    },
    bookDescription: {
      type: String,
      required: true,
      minlength: 3,
    },
    // bookImage: {
    //   type: String,
    //   required: true,
    // },
    deleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
