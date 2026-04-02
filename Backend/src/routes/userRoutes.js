const router   = require('express').Router()
const { body } = require('express-validator')
const ctrl     = require('../controllers/userController')
const validate = require('../middleware/validate')
const { protect, restrictTo } = require('../middleware/auth')

// All user routes require authentication
router.use(protect)

// GET  /api/users/me/profile
router.get('/me/profile', ctrl.getMyProfile)

// PUT  /api/users/me/profile
router.put(
  '/me/profile',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be blank'),
    body('age').optional().isInt({ min: 18, max: 100 }).withMessage('Age must be 18–100'),
    body('phone').optional().trim().notEmpty().withMessage('Phone cannot be blank'),
  ],
  validate,
  ctrl.updateMyProfile
)

// PATCH /api/users/me/live  — drivers only
router.patch('/me/live', restrictTo('driver'), ctrl.toggleLive)

// GET  /api/users/:id  — public profile
router.get('/:id', ctrl.getUserById)

module.exports = router
