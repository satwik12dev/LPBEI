const User   = require('../models/User')
const { ok, badRequest, notFound } = require('../utils/apiResponse')

// ── GET /api/users/me/profile ─────────────────────────────────────────────────

exports.getMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) return notFound(res, 'User not found.')
  return ok(res, user)
}

// ── PUT /api/users/me/profile ─────────────────────────────────────────────────
// Accepts a flat body; we route the fields into the correct sub-document
// depending on the user's role.

exports.updateMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) return notFound(res, 'User not found.')

  if (user.role === 'client') {
    const { name, age, workType, phone, city } = req.body
    user.clientProfile = { ...user.clientProfile?.toObject?.() ?? {}, name, age, workType, phone, city }
  } else if (user.role === 'driver') {
    const { name, age, phone, vehicleType, vehicleNumber, licenseNumber, loadCapacity, routes, fare } = req.body
    user.driverProfile = {
      ...user.driverProfile?.toObject?.() ?? {},
      name, age, phone, vehicleType, vehicleNumber, licenseNumber, loadCapacity,
      routes: routes ?? user.driverProfile?.routes ?? [],
      fare:   fare   ?? user.driverProfile?.fare   ?? {},
    }
  }

  user.profileComplete = true
  await user.save()
  return ok(res, user, 'Profile updated successfully.')
}

// ── PATCH /api/users/me/live ──────────────────────────────────────────────────
// Toggle driver availability

exports.toggleLive = async (req, res) => {
  if (req.user.role !== 'driver') return badRequest(res, 'Only drivers can toggle availability.')

  const user = await User.findById(req.user._id)
  if (!user) return notFound(res)

  const current = user.driverProfile?.isLive ?? false
  user.driverProfile = { ...user.driverProfile?.toObject?.() ?? {}, isLive: !current }
  await user.save()

  return ok(res, { isLive: !current }, `You are now ${!current ? 'live' : 'offline'}.`)
}

// ── GET /api/users/:id ────────────────────────────────────────────────────────
// Public profile (e.g. client viewing a driver's card)

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return notFound(res, 'User not found.')
  return ok(res, user)
}
