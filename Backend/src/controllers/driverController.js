const User    = require('../models/User')
const Booking = require('../models/Booking')
const { ok, notFound } = require('../utils/apiResponse')
const { reverseRoute, driversForRoute } = require('../utils/pooling')

// ── GET /api/drivers ──────────────────────────────────────────────────────────
// Query params:
//   route       — filter by exact route string
//   vehicleType — filter by vehicle type
//   liveOnly    — "true" to return only live drivers
//   page        — pagination (default 1)
//   limit       — results per page (default 20)

exports.listDrivers = async (req, res) => {
  const {
    route,
    vehicleType,
    liveOnly,
    page  = 1,
    limit = 20,
    search,
  } = req.query

  const filter = { role: 'driver', profileComplete: true }

  if (liveOnly === 'true')  filter['driverProfile.isLive'] = true
  if (vehicleType)          filter['driverProfile.vehicleType'] = vehicleType
  if (route)                filter['driverProfile.routes'] = route   // matches if array contains route

  // Free-text search across name and routes
  if (search) {
    const regex = new RegExp(search, 'i')
    filter.$or = [
      { 'driverProfile.name': regex },
      { 'driverProfile.routes': regex },
      { 'driverProfile.vehicleType': regex },
    ]
  }

  const skip  = (Number(page) - 1) * Number(limit)
  const total = await User.countDocuments(filter)
  const drivers = await User.find(filter)
    .select('-password -clientProfile -email')
    .sort({ 'driverProfile.rating': -1 })
    .skip(skip)
    .limit(Number(limit))

  return ok(res, {
    drivers,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  })
}

// ── GET /api/drivers/:id ──────────────────────────────────────────────────────

exports.getDriver = async (req, res) => {
  const driver = await User.findOne({ _id: req.params.id, role: 'driver' }).select('-password -clientProfile')
  if (!driver) return notFound(res, 'Driver not found.')
  return ok(res, driver)
}

// ── GET /api/drivers/return-suggestions ──────────────────────────────────────
// Query params:  route  (required)  e.g. "Delhi → Moradabad"
// Returns live drivers who cover the reverse route.

exports.returnSuggestions = async (req, res) => {
  const { route } = req.query
  if (!route) return ok(res, { suggestions: [], returnRoute: null })

  const returnRoute = reverseRoute(route)
  if (!returnRoute) return ok(res, { suggestions: [], returnRoute: null })

  const drivers = await User.find({
    role: 'driver',
    profileComplete: true,
    'driverProfile.isLive': true,
    'driverProfile.routes': returnRoute,
  }).select('-password -clientProfile -email')

  return ok(res, { suggestions: drivers, returnRoute })
}

// ── GET /api/drivers/vehicle-types ───────────────────────────────────────────
// Returns distinct vehicle types across all registered drivers (for filter UI)

exports.vehicleTypes = async (_req, res) => {
  const types = await User.distinct('driverProfile.vehicleType', {
    role: 'driver',
    profileComplete: true,
    'driverProfile.vehicleType': { $exists: true, $ne: '' },
  })
  return ok(res, types.filter(Boolean).sort())
}
