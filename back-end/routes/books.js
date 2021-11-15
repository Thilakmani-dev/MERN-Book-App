const router = require('express').Router();
const { getBooks, editBook, addBook } = require('../controllers/books');

router.route('/get').get(getBooks);

router.route('/edit').post(editBook);

router.route('/add').post(addBook);

module.exports = router;
