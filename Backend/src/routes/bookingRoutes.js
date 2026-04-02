const router   = require('express').Router()
const { body } = require('express-validator')
const ctrl     = require('../controllers/bookingController')
const validate = require('../middleware/validate')
const { protect, restrictTo } = require('../middleware/auth')

// All booking routes require authentication
router.use(protect)

// ── Validation chains ─────────────────────────────────────────────────────────

const createRules = [
  body('driverId').notEmpty().withMessage('Driver ID is required'),
  body('route').trim().notEmpty().withMessage('Route is required'),
  body('date')
    .notEmpty().withMessage('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be YYYY-MM-DD'),
  body('time')
    .notEmpty().withMessage('Time is required')
    .matches(/^\d{2}:\d{2}$/).withMessage('Time must be HH:MM'),
  body('tripType')
    .optional()
    .isIn(['one-way', 'return']).withMessage('Trip type must be one-way or return'),
]

// ── Routes ────────────────────────────────────────────────────────────────────

// GET  /api/bookings/stats   — dashboard stats for logged-in user
router.get('/stats', ctrl.getStats)

// GET  /api/bookings         — list (scoped to role)
router.get('/', ctrl.getBookings)

// POST /api/bookings         — client creates booking
router.post('/', restrictTo('client'), createRules, validate, ctrl.createBooking)

// GET  /api/bookings/:id
router.get('/:id', ctrl.getBookingById)

// PATCH /api/bookings/:id/cancel    — client or driver
router.patch('/:id/cancel', ctrl.cancelBooking)

// PATCH /api/bookings/:id/accept    — driver only
router.patch('/:id/accept', restrictTo('driver'), ctrl.acceptBooking)

// PATCH /api/bookings/:id/reject    — driver only
router.patch('/:id/reject', restrictTo('driver'), ctrl.rejectBooking)

// PATCH /api/bookings/:id/complete  — driver only
router.patch('/:id/complete', restrictTo('driver'), ctrl.completeBooking)

module.exports = router
