const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authenticate');

const authorsController = require('../controllers/authors');

// Public Routes
router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);

// Protected Routes
router.post('/', isAuthenticated, authorsController.createAuthor);
router.put('/:id', isAuthenticated, authorsController.updateAuthor);
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor); 

module.exports = router;
