/**
 * Two-Way Pooling Utilities
 *
 * Core idea:
 *   If a driver just completed  A → B,
 *   suggest drivers available for B → A  (same or different driver).
 *
 *   The fare for the return leg uses a discount multiplier so the
 *   client pays less than two full one-way fares.
 */

const RETURN_DISCOUNT = 0.90   // 10 % discount on combined fare
const RETURN_MARKUP   = 1.80   // return-trip total = base × 1.80  (saves 10 % vs 2×)

/**
 * Given  "Delhi → Moradabad"  returns  "Moradabad → Delhi"
 */
const reverseRoute = (route) => {
  if (!route) return null
  const parts = route.split(' → ')
  if (parts.length < 2) return null
  return parts.reverse().join(' → ')
}

/**
 * Calculate the fare for a return trip (both legs together).
 */
const returnFare = (baseOneWayFare) => Math.round(baseOneWayFare * RETURN_MARKUP)

/**
 * Given a list of completed routes for a client,
 * return unique reversed routes that could be matched.
 */
const suggestedReturnRoutes = (completedRoutes = []) =>
  [...new Set(completedRoutes.map(reverseRoute).filter(Boolean))]

/**
 * Filter a list of driver documents for those who cover a specific route
 * and are currently live.
 *
 * @param {import('../models/User').default[]} drivers
 * @param {string} route  e.g. "Moradabad → Delhi"
 */

const driversForRoute = (drivers, route) =>
  drivers.filter(
    (d) =>
      d.driverProfile?.isLive &&
      Array.isArray(d.driverProfile.routes) &&
      d.driverProfile.routes.includes(route)
  )

module.exports = { reverseRoute, returnFare, suggestedReturnRoutes, driversForRoute, RETURN_MARKUP, RETURN_DISCOUNT }
