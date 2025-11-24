const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authenticate');

const contactsController = require('../controllers/books');

// Public Routes
router.get('/', contactsController.getAllBooks);
router.get('/:id', contactsController.getBookById);

// Protected Routes
router.post('/', isAuthenticated, contactsController.createBook);
router.put('/:id', isAuthenticated, contactsController.updateBook);
router.delete('/:id', isAuthenticated, contactsController.deleteBook);


module.exports = router;