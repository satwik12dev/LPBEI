/**
 * Global error-handling middleware.
 * Must be registered LAST in Express (after all routes).
 *
 * Handles:
 *  - Mongoose CastError          → 400
 *  - Mongoose ValidationError    → 400
 *  - Mongoose duplicate key (11000) → 409
 *  - JWT errors                  → 401
 *  - Everything else             → 500
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message    = err.message    || 'Internal server error'

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}: ${err.value}`
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors).map((e) => e.message).join('. ')
  }

  // MongoDB duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    statusCode = 409
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`
  }

  // JWT
  if (err.name === 'JsonWebTokenError')  { statusCode = 401; message = 'Invalid token.' }
  if (err.name === 'TokenExpiredError')  { statusCode = 401; message = 'Token expired.' }

  if (process.env.NODE_ENV !== 'production') {
    console.error('🔴 Error:', err)
  }

  res.status(statusCode).json({
    success: false,
    error:   message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler
