const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/books');

router.get('/', contactsController.getAllBooks);

router.get('/:id', contactsController.getBookById);

router.post('/', contactsController.createBook);

router.put('/:id', contactsController.updateBook);

router.delete('/:id', contactsController.deleteBook);


module.exports = router;