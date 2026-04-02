const Booking = require('../models/Booking')
const User    = require('../models/User')
const { ok, created, badRequest, notFound, forbidden } = require('../utils/apiResponse')
const { returnFare } = require('../utils/pooling')

// ── POST /api/bookings ────────────────────────────────────────────────────────
// Client creates a booking

exports.createBooking = async (req, res) => {
  const { driverId, route, date, time, tripType } = req.body

  // Validate driver exists and is live
  const driver = await User.findOne({ _id: driverId, role: 'driver' })
  if (!driver) return notFound(res, 'Driver not found.')
  if (!driver.driverProfile?.isLive) return badRequest(res, 'Driver is currently unavailable.')

  // Validate route is offered by driver
  const driverRoutes = driver.driverProfile?.routes ?? []
  if (!driverRoutes.includes(route)) return badRequest(res, 'Driver does not cover this route.')

  // Calculate fare
  const baseMap = driver.driverProfile?.fare instanceof Map
    ? Object.fromEntries(driver.driverProfile.fare)
    : driver.driverProfile?.fare ?? {}
  const baseFare = baseMap[route]
  if (!baseFare) return badRequest(res, 'Fare not configured for this route.')

  const fare = tripType === 'return' ? returnFare(baseFare) : baseFare

  const client = req.user

  const booking = await Booking.create({
    client:      client._id,
    driver:      driver._id,
    clientName:  client.clientProfile?.name  || client.username,
    clientPhone: client.clientProfile?.phone || '',
    driverName:  driver.driverProfile?.name  || driver.username,
    vehicleType: driver.driverProfile?.vehicleType || '',
    route, date, time, tripType, fare,
    status:       'pending',
    driverStatus: 'pending',
  })

  return created(res, booking, 'Booking request sent to driver.')
}

// ── GET /api/bookings ─────────────────────────────────────────────────────────
// Returns bookings scoped to the authenticated user's role.
// Clients see their own bookings.  Drivers see requests directed at them.

exports.getBookings = async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query
  const skip = (Number(page) - 1) * Number(limit)

  const filter = req.user.role === 'client'
    ? { client: req.user._id }
    : { driver: req.user._id }

  if (status) {
    if (req.user.role === 'driver') filter.driverStatus = status
    else                            filter.status       = status
  }

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('client', 'username clientProfile.name clientProfile.phone')
      .populate('driver', 'username driverProfile.name driverProfile.vehicleType'),
    Booking.countDocuments(filter),
  ])

  return ok(res, {
    bookings,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  })
}

// ── GET /api/bookings/:id ─────────────────────────────────────────────────────

exports.getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('client', 'username clientProfile')
    .populate('driver', 'username driverProfile')

  if (!booking) return notFound(res, 'Booking not found.')

  // Only the client or driver involved can view it
  const isParty = booking.client._id.equals(req.user._id) || booking.driver._id.equals(req.user._id)
  if (!isParty) return forbidden(res, 'You do not have access to this booking.')

  return ok(res, booking)
}

// ── PATCH /api/bookings/:id/cancel ────────────────────────────────────────────
// Clients (and drivers) can cancel a pending / upcoming booking

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) return notFound(res, 'Booking not found.')

  const isClient = booking.client.equals(req.user._id)
  const isDriver = booking.driver.equals(req.user._id)
  if (!isClient && !isDriver) return forbidden(res, 'Not your booking.')

  const cancellable = ['pending', 'confirmed', 'upcoming']
  if (!cancellable.includes(booking.status)) {
    return badRequest(res, `Cannot cancel a booking with status "${booking.status}".`)
  }

  booking.status       = 'cancelled'
  booking.driverStatus = 'rejected'
  booking.cancelledBy  = isClient ? 'client' : 'driver'
  booking.cancelReason = req.body.reason ?? ''
  await booking.save()

  return ok(res, booking, 'Booking cancelled successfully.')
}

// ── PATCH /api/bookings/:id/accept ────────────────────────────────────────────
// Driver accepts a booking request

exports.acceptBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) return notFound(res, 'Booking not found.')
  if (!booking.driver.equals(req.user._id)) return forbidden(res, 'Not your booking request.')

  if (booking.driverStatus !== 'pending') {
    return badRequest(res, `Booking is already "${booking.driverStatus}".`)
  }

  booking.driverStatus = 'accepted'
  booking.status       = 'confirmed'
  await booking.save()

  // Increment driver trip counter
  await User.findByIdAndUpdate(req.user._id, { $inc: { 'driverProfile.trips': 1 } })

  return ok(res, booking, 'Booking accepted.')
}

// ── PATCH /api/bookings/:id/reject ────────────────────────────────────────────
// Driver rejects a booking request

exports.rejectBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) return notFound(res, 'Booking not found.')
  if (!booking.driver.equals(req.user._id)) return forbidden(res, 'Not your booking request.')

  if (booking.driverStatus !== 'pending') {
    return badRequest(res, `Booking is already "${booking.driverStatus}".`)
  }

  booking.driverStatus = 'rejected'
  booking.status       = 'rejected'
  booking.cancelReason = req.body.reason ?? ''
  await booking.save()

  return ok(res, booking, 'Booking rejected.')
}

// ── PATCH /api/bookings/:id/complete ─────────────────────────────────────────
// Mark a booking as completed (driver)

exports.completeBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) return notFound(res, 'Booking not found.')
  if (!booking.driver.equals(req.user._id)) return forbidden(res, 'Not your booking.')

  if (booking.status !== 'confirmed') {
    return badRequest(res, 'Only confirmed bookings can be marked as completed.')
  }

  booking.status = 'completed'
  await booking.save()

  return ok(res, booking, 'Trip marked as completed.')
}

// ── GET /api/bookings/stats ───────────────────────────────────────────────────
// Dashboard stats for the logged-in user

exports.getStats = async (req, res) => {
  const matchField = req.user.role === 'client' ? 'client' : 'driver'

  const [total, completed, upcoming, cancelled, pending] = await Promise.all([
    Booking.countDocuments({ [matchField]: req.user._id }),
    Booking.countDocuments({ [matchField]: req.user._id, status: 'completed' }),
    Booking.countDocuments({ [matchField]: req.user._id, status: { $in: ['upcoming', 'confirmed'] } }),
    Booking.countDocuments({ [matchField]: req.user._id, status: 'cancelled' }),
    Booking.countDocuments({ [matchField]: req.user._id, driverStatus: 'pending' }),
  ])

  // Total earnings for driver
  let totalEarnings = 0
  if (req.user.role === 'driver') {
    const result = await Booking.aggregate([
      { $match: { driver: req.user._id, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$fare' } } },
    ])
    totalEarnings = result[0]?.total ?? 0
  }

  return ok(res, { total, completed, upcoming, cancelled, pending, totalEarnings })
}
