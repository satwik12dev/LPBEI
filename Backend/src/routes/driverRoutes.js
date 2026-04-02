const router = require('express').Router()
const ctrl   = require('../controllers/driverController')
const { protect } = require('../middleware/auth')

// GET /api/drivers/return-suggestions?route=...   (must be before /:id)
router.get('/return-suggestions', protect, ctrl.returnSuggestions)

// GET /api/drivers/vehicle-types
router.get('/vehicle-types', ctrl.vehicleTypes)

// GET /api/drivers        — list & filter
router.get('/', protect, ctrl.listDrivers)

// GET /api/drivers/:id
router.get('/:id', protect, ctrl.getDriver)

module.exports = router
