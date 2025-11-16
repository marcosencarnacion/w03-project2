const mongodb = require('../data/database');
const { ObjectId} = require('mongodb');
const validateAuthor = require('../validators/authorValidator');

const getAllAuthors = async (req, res) => {
  //#swagger.tags = ['Authors']
  try {
    const db = mongodb.getDatabase(); // database name
    const authors = await db.collection('authors').find().toArray(); // collection name
    res.status(200).json(authors);
  } catch (error) {
    console.error('❌ Error fetching authors:', error);
    res.status(500).json({ message: 'Error fetching authors' });
  }
};

// Get one author by ID
const getAuthorById = async (req, res) => {
  //#swagger.tags = ['Authors']
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }

    const db = mongodb.getDatabase();
    const author = await db.collection('authors').findOne({ _id: new ObjectId(id) });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error('❌ Error fetching author by ID:', error);
    res.status(500).json({ message: 'Error fetching author by ID' });
  }
};

// Create a New Author
const createAuthor = async (req, res) => {
  //#swagger.tags = ['Authors']
  //#swagger.parameters['author'] = { 
  //     in: 'body',
  //     required: true,
  //     schema: { $ref: '#/definitions/Author' }
  //}
  
  try {
    
    const newAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality,
      genres: req.body.genres,
      active: req.body.active,
      rating: req.body.rating,
      booksWritten: req.body.booksWritten,
      bio: req.body.bio
    };
    
    // VALIDATION
    const errors = validateAuthor(newAuthor);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const db = mongodb.getDatabase();
    console.log('✅ Connected DB:', db.libraryDB); // Log the database name
    const response = await db.collection('authors').insertOne(newAuthor);

    if (response.acknowledged) {
      res.status(201).json({ message: '✅ Author created successfully', authorId: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create author' });
    }
  } catch (error) {
    console.error('❌ Error creating author:', error);
    res.status(500).json({ message: 'Error creating author' });
  }
};

// Update an existing Author
const updateAuthor = async (req, res) => {
  //#swagger.tags = ['Authors']
  //#swagger.parameters['author'] = { 
  //     in: 'body',
  //     required: true,
  //     schema: { $ref: '#/definitions/Author' }
  //}

  
  try {
    const { id } = req.params;

    // Validate ID before using it
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Author ID' });
    }

    const authorId = new ObjectId(id);

    const newAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality,
      genres: req.body.genres,
      active: req.body.active,
      rating: req.body.rating,
      booksWritten: req.body.booksWritten,
      bio: req.body.bio
    };

    // VALIDATION
    const errors = validateAuthor(newAuthor);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const db = mongodb.getDatabase();
    const response = await db.collection('authors').updateOne(
      { _id: authorId },
      { $set: newAuthor }
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found or no changes made.' });
    }
  } catch (error) {
    console.error('❌ Error updating Author:', error);
    res.status(500).json({ message: 'Error updating Author' });
  }
};

// Delete Author
const deleteAuthor = async (req, res) => {
  //#swagger.tags = ['Authors']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }

    const authorId = new ObjectId(id);

    const db = mongodb.getDatabase();
    const response = await db.collection('authors').deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found.' });
    }
  } catch (error) {
    console.error('❌ Error deleting Author:', error);
    res.status(500).json({ message: 'Error deleting Author' });
  }
};


module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};