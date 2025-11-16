function validateBook(data) {
  const errors = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push("Title is required and must be a string.");
  }

  if (!data.author || typeof data.author !== 'string') {
    errors.push("Author is required and must be a string.");
  }

  if (!data.description || typeof data.description !== 'string') {
    errors.push("Description is required and must be a string.");
  }

  if (!data.genres || !Array.isArray(data.genres)) {
    errors.push("Genres must be an array.");
  }

  if (!data.publishedYear || typeof data.publishedYear !== 'number') {
    errors.push("Published year must be a number.");
  }

  if (data.rating !== undefined) {
    if (typeof data.rating !== 'number' || data.rating < 1 || data.rating > 5) {
      errors.push("Rating must be a number between 1 and 5.");
    }
  }

  return errors;
}

module.exports = validateBook;
