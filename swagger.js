const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing Books and Authors collections'
  },
  host: 'w03-project2-a66l.onrender.com',
  schemes: ['https'],

  // ============================
  // 📘 SCHEMAS (Book + Author)
  // ============================
  definitions: {
    Book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      publishedYear: 1925,
      isbn: "9780743273565",
      pages: 180,
      available: true,
      rating: 4.8
    },

    Author: {
      firstName: "George",
      lastName: "Orwell",
      birthYear: 1903,
      nationality: "British",
      genres: ["Dystopian", "Political Fiction"],
      active: false,
      rating: 5,
      booksWritten: 9,
      bio: "George Orwell was an English novelist and critic..."
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
