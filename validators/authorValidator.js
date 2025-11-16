function validateAuthor(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push("Name is required and must be a string.");
  }

  if (!data.bio || typeof data.bio !== 'string') {
    errors.push("Bio is required and must be a string.");
  }

  if (!data.nationality || typeof data.nationality !== 'string') {
    errors.push("Nationality is required and must be a string.");
  }

  if (!data.birthYear || typeof data.birthYear !== 'number') {
    errors.push("Birth year must be a number.");
  }

  if (!data.booksWritten || !Array.isArray(data.booksWritten)) {
    errors.push("Books written must be an array.");
  }

  if (typeof data.isAlive !== 'boolean') {
    errors.push("isAlive must be a boolean.");
  }

  if (!data.awards || !Array.isArray(data.awards)) {
    errors.push("Awards must be an array.");
  }

  return errors;
}

module.exports = validateAuthor;
