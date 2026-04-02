const { verifyToken }  = require('../utils/jwt')
const { unauthorized, forbidden } = require('../utils/apiResponse')
const User = require('../models/User')

/**
 * protect
 * Reads Bearer token from Authorization header, verifies it,
 * and attaches the full user document to req.user.
 */
const protect = async (req, res, next) => {
  let token

  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  }

  if (!token) return unauthorized(res, 'No token provided. Please log in.')

  let decoded
  try {
    decoded = verifyToken(token)
  } catch (err) {
    if (err.name === 'TokenExpiredError') return unauthorized(res, 'Token expired. Please log in again.')
    return unauthorized(res, 'Invalid token.')
  }

  const user = await User.findById(decoded.id).select('-password')
  if (!user) return unauthorized(res, 'User no longer exists.')

  req.user = user
  next()
}

/**
 * restrictTo(...roles)
 * Factory that returns a middleware allowing only the specified role(s).
 * Must be used AFTER `protect`.
 *
 * Usage:
 *   router.post('/book', protect, restrictTo('client'), bookingController.create)
 */
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return forbidden(res, `This action is restricted to: ${roles.join(', ')}.`)
  }
  next()
}

module.exports = { protect, restrictTo }
