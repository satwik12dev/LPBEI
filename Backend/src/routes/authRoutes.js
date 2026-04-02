const router   = require('express').Router()
const { body } = require('express-validator')
const ctrl     = require('../controllers/authController')
const validate = require('../middleware/validate')
const { protect } = require('../middleware/auth')

// ── Validation chains ─────────────────────────────────────────────────────────

const signupRules = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['client', 'driver']).withMessage('Role must be client or driver'),
]

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/auth/signup
router.post('/signup', signupRules, validate, ctrl.signup)

// POST /api/auth/login
router.post('/login', loginRules, validate, ctrl.login)

// GET  /api/auth/me  (protected)
router.get('/me', protect, ctrl.getMe)

// POST /api/auth/logout
router.post('/logout', protect, ctrl.logout)

module.exports = router
