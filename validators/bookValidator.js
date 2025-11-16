function validateBook(data) {
  const errors = [];

  // Title
  if (!data.title || typeof data.title !== 'string') {
    errors.push("Title is required and must be a string.");
  }

  // Author
  if (!data.author || typeof data.author !== 'string') {
    errors.push("Author is required and must be a string.");
  }

  // Genre
  if (!data.genre || typeof data.genre !== 'string') {
    errors.push("Genre is required and must be a string.");
  }

  // Published Year
  if (data.publishedYear === undefined || typeof data.publishedYear !== 'number') {
    errors.push("Published year is required and must be a number.");
  }

  // ISBN
  if (!data.isbn || typeof data.isbn !== 'number') {
    errors.push("ISBN is required and must be a number.");
  }

  // Pages
  if (data.pages === undefined || typeof data.pages !== 'number') {
    errors.push("Pages is required and must be a number.");
  }

  // Available
  if (data.available === undefined || typeof data.available !== 'boolean') {
    errors.push("Available is required and must be a boolean.");
  }

  // Rating (optional)
  if (data.rating !== undefined) {
    if (typeof data.rating !== 'number' || data.rating < 1 || data.rating > 5) {
      errors.push("Rating must be a number between 1 and 5.");
    }
  }

  return errors;
}

module.exports = validateBook;
