function validateAuthor(data) {
  const errors = [];

  // First Name
  if (!data.firstName || typeof data.firstName !== 'string') {
    errors.push("First name is required and must be a string.");
  }

  // Last Name
  if (!data.lastName || typeof data.lastName !== 'string') {
    errors.push("Last name is required and must be a string.");
  }

  // Birth Year
  if (data.birthYear === undefined || typeof data.birthYear !== 'number') {
    errors.push("Birth year is required and must be a number.");
  }

  // Nationality
  if (!data.nationality || typeof data.nationality !== 'string') {
    errors.push("Nationality is required and must be a string.");
  }

  // Genres
  if (!data.genres || !Array.isArray(data.genres)) {
    errors.push("Genres must be an array.");
  }

  // Active
  if (data.active === undefined || typeof data.active !== 'boolean') {
    errors.push("Active status is required and must be a boolean.");
  }

  // Rating (optional)
  if (data.rating !== undefined) {
    if (typeof data.rating !== 'number' || data.rating < 1 || data.rating > 5) {
      errors.push("Rating must be a number between 1 and 5.");
    }
  }

  // Books Written
  if (!data.booksWritten || !Array.isArray(data.booksWritten)) {
    errors.push("Books written must be an array.");
  }

  // Bio
  if (!data.bio || typeof data.bio !== 'string') {
    errors.push("Bio is required and must be a string.");
  }

  return errors;
}

module.exports = validateAuthor;
