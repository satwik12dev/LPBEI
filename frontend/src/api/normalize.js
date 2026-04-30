/**
 * Normalizers — transform API response shapes into the flat shapes
 * that existing UI components expect.
 */

/**
 * Convert a backend User (driver) document into the flat driver
 * shape used by DriverCard, BookingModal, etc.
 */
export function normalizeDriver(apiUser) {
  const dp = apiUser.driverProfile || {}
  // fare may come back as a plain object or a Map-like structure
  let fareObj = dp.fare || {}
  if (fareObj instanceof Map) {
    fareObj = Object.fromEntries(fareObj)
  }
  // handle Mongoose serialized Map (comes as plain object, should be fine)

  const name = dp.name || apiUser.username || ''
  return {
    id: apiUser._id || apiUser.id,
    name,
    avatar: name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
    vehicleType: dp.vehicleType || '',
    vehicleNumber: dp.vehicleNumber || '',
    licenseNumber: dp.licenseNumber || '',
    loadCapacity: dp.loadCapacity || '',
    rating: dp.rating || 0,
    trips: dp.trips || 0,
    isLive: dp.isLive || false,
    routes: dp.routes || [],
    fare: fareObj,
    phone: dp.phone || '',
    badge: dp.badge || null,
    completionRate: dp.completionRate || 100,
  }
}

/**
 * Convert a backend Booking document into the flat booking
 * shape used by dashboard components.
 */
export function normalizeBooking(apiBooking) {
  return {
    id: apiBooking._id || apiBooking.id,
    clientId:
      apiBooking.client?._id || apiBooking.client?.id || apiBooking.client,
    clientName: apiBooking.clientName || apiBooking.client?.username || '',
    clientPhone:
      apiBooking.clientPhone ||
      apiBooking.client?.clientProfile?.phone ||
      '',
    driverId:
      apiBooking.driver?._id || apiBooking.driver?.id || apiBooking.driver,
    driverName: apiBooking.driverName || apiBooking.driver?.username || '',
    vehicleType:
      apiBooking.vehicleType ||
      apiBooking.driver?.driverProfile?.vehicleType ||
      '',
    route: apiBooking.route,
    date: apiBooking.date,
    time: apiBooking.time,
    tripType: apiBooking.tripType || 'one-way',
    fare: apiBooking.fare,
    status: apiBooking.status,
    driverStatus: apiBooking.driverStatus || 'pending',
    createdAt: apiBooking.createdAt,
  }
}

/**
 * Normalize the user object coming from the auth/me endpoint
 * into the shape the frontend contexts expect.
 */
export function normalizeUser(apiUser) {
  const role = apiUser.role
  const profileData =
    role === 'driver' ? apiUser.driverProfile : apiUser.clientProfile

  return {
    id: apiUser._id || apiUser.id,
    email: apiUser.email,
    username: apiUser.username,
    role,
    profileComplete: apiUser.profileComplete || false,
    profile: profileData || {},
  }
}
