const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));

// Use the books route
router.use('/books', require('./books'));

// Authors route
router.use('/authors', require('./authors'));

// OAuth GitHub authentication route
router.get('/login', passport.authenticate('github'), (req, res) => {});

// OAuth GitHub Logout route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// // Redirect root to /books or respond with a message
// router.get('/', (req, res) => {
//   //#swagger.tags =['Welcome to the Books API']
//   res.send('Welcome to the Books API 👋');
// });

// // Redirect root to /contacts or respond with a message
// router.get('/', (req, res) => {
//   //#swagger.tags =['Welcome to the Authors API']
//   res.send('Welcome to the Authors API 👋');
// });



module.exports = router;