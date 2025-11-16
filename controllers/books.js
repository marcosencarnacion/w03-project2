const mongodb = require('../data/database');
const { ObjectId} = require('mongodb');
const validateBook = require('../validators/bookValidator');

const getAllBooks = async (req, res) => {
  //#swagger.tags = ['Books']
  try {
    const db = mongodb.getDatabase(); // database name
    const books = await db.collection('books').find().toArray(); // collection name
    res.status(200).json(books);
  } catch (error) {
    console.error('❌ Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

// Get one book by ID
const getBookById = async (req, res) => {
  //#swagger.tags = ['Books']
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const db = mongodb.getDatabase();
    const book = await db.collection('books').findOne({ _id: new ObjectId(id) });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('❌ Error fetching book by ID:', error);
    res.status(500).json({ message: 'Error fetching book by ID' });
  }
};

// Create a New Book
const createBook = async (req, res) => {
  //#swagger.tags = ['Books']
  //#swagger.parameters['book'] = { 
  //     in: 'body',
  //     required: true,
  //     schema: { $ref: '#/definitions/Book' }
  //}
  try {
    
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      isbn: req.body.isbn,
      pages: req.body.pages,
      available: req.body.available,
      rating: req.body.rating
    };

    // VALIDATION
    const errors = validateBook(newBook);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const db = mongodb.getDatabase();
    console.log('✅ Connected DB:', db.libraryDB); // Log the database name
    const response = await db.collection('books').insertOne(newBook);

    if (response.acknowledged) {
      res.status(201).json({ message: '✅ Book created successfully', bookId: response.insertedId });
    } else {
      res.status(500).json({ message: '❌ Failed to create book' });
    }
  } catch (error) {
    console.error('❌ Error creating book:', error);
    res.status(500).json({ message: 'Error creating book' });
  }
};

// Update an existing Book
const updateBook = async (req, res) => {
  //#swagger.tags = ['Books']
  //#swagger.parameters['book'] = { 
  //     in: 'body',
  //     required: true,
  //     schema: { $ref: '#/definitions/Book' }
  //}

  try {
    const { id } = req.params;

    // Validate ID before using it
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const bookId = new ObjectId(id);

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      isbn: req.body.isbn,
      pages: req.body.pages,
      available: req.body.available,
      rating: req.body.rating
    };

    // VALIDATION
    const errors = validateBook(newBook);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const db = mongodb.getDatabase();
    const response = await db.collection('books').updateOne(
      { _id: bookId },
      { $set: newBook }
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or no changes made.' });
    }
  } catch (error) {
    console.error('❌ Error updating Book:', error);
    res.status(500).json({ message: 'Error updating Book' });
  }
};

// Delete a Book
const deleteBook = async (req, res) => {
  //#swagger.tags = ['Books']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const bookId = new ObjectId(id);

    const db = mongodb.getDatabase();
    const response = await db.collection('books').deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (error) {
    console.error('❌ Error deleting Book:', error);
    res.status(500).json({ message: 'Error deleting Book' });
  }
};


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};