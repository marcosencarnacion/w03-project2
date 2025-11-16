const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

// Redirect root to /books or respond with a message
router.get('/', (req, res) => {
  //#swagger.tags =['Welcome to the Books API']
  res.send('Welcome to the Books API 👋');
});

// Redirect root to /contacts or respond with a message
router.get('/', (req, res) => {
  //#swagger.tags =['Welcome to the Authors API']
  res.send('Welcome to the Authors API 👋');
});

// Use the books route
router.use('/books', require('./books'));

// Authors route
router.use('/authors', require('./authors'));

module.exports = router;