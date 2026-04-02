const User     = require('../models/User')
const { signToken }  = require('../utils/jwt')
const { ok, created, badRequest, unauthorized, conflict } = require('../utils/apiResponse')

// ── Helpers ───────────────────────────────────────────────────────────────────

const buildTokenResponse = (user) => ({
  token: signToken(user),
  user:  user.toJSON(),
})

// ── POST /api/auth/signup ─────────────────────────────────────────────────────

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body

  const existing = await User.findOne({ email })
  if (existing) return conflict(res, 'An account with that email already exists.')

  const user = await User.create({ username, email, password, role })
  return created(res, buildTokenResponse(user), 'Account created successfully.')
}

// ── POST /api/auth/login ──────────────────────────────────────────────────────

exports.login = async (req, res) => {
  const { email, password } = req.body

  // Explicitly select password (it's excluded by default)
  const user = await User.findOne({ email }).select('+password')
  if (!user) return unauthorized(res, 'Invalid email or password.')

  const match = await user.comparePassword(password)
  if (!match) return unauthorized(res, 'Invalid email or password.')

  return ok(res, buildTokenResponse(user), 'Login successful.')
}

// ── GET /api/auth/me ──────────────────────────────────────────────────────────

exports.getMe = async (req, res) => {
  // req.user is attached by the protect middleware
  return ok(res, req.user)
}

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
// JWT is stateless; client just discards the token.
// This endpoint exists so the frontend can call it uniformly.

exports.logout = (_req, res) => {
  return ok(res, null, 'Logged out successfully.')
}
