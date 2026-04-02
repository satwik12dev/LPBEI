const jwt = require('jsonwebtoken')

const SECRET  = () => process.env.JWT_SECRET
const EXPIRES = () => process.env.JWT_EXPIRES_IN || '7d'

/**
 * Sign a JWT containing { id, role }
 */
const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, SECRET(), { expiresIn: EXPIRES() })

/**
 * Verify and decode a JWT.  Throws if invalid / expired.
 */
const verifyToken = (token) => jwt.verify(token, SECRET())

module.exports = { signToken, verifyToken }
