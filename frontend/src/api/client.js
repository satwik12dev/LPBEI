/**
 * EzyTranship — API Client
 *
 * Every function:
 *  - reads the JWT from localStorage automatically
 *  - returns { data } on success
 *  - throws an Error with a human-readable message on failure
 *
 * Base URL is read from the Vite env variable VITE_API_URL.
 */

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Core fetch wrapper ────────────────────────────────────────────────────────

async function request(method, path, body = null, auth = true) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const token = localStorage.getItem('ezy_token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const json = await res.json()

  if (!res.ok) {
    const message = json.error || json.message || 'Something went wrong.'
    const err = new Error(message)
    err.status = res.status
    err.errors = json.errors || []
    throw err
  }

  return json.data
}

const get    = (path)         => request('GET',    path)
const post   = (path, body)   => request('POST',   path, body)
const put    = (path, body)   => request('PUT',    path, body)
const patch  = (path, body)   => request('PATCH',  path, body)
const del    = (path)         => request('DELETE', path)
const postNoAuth = (path, body) => request('POST', path, body, false)

// ── Auth ──────────────────────────────────────────────────────────────────────

export const auth = {
  signup: (username, email, password, role) =>
    postNoAuth('/auth/signup', { username, email, password, role }),

  login: (email, password) =>
    postNoAuth('/auth/login', { email, password }),

  me: () => get('/auth/me'),

  logout: () => post('/auth/logout'),
}

// ── Users / Profile ───────────────────────────────────────────────────────────

export const users = {
  getMyProfile: () => get('/users/me/profile'),

  updateMyProfile: (data) => put('/users/me/profile', data),

  toggleLive: () => patch('/users/me/live'),

  getById: (id) => get(`/users/${id}`),
}

// ── Drivers ───────────────────────────────────────────────────────────────────

export const drivers = {
  /**
   * @param {{ route?, vehicleType?, liveOnly?, search?, page?, limit? }} params
   */
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
    ).toString()
    return get(`/drivers${qs ? `?${qs}` : ''}`)
  },

  getById: (id) => get(`/drivers/${id}`),

  vehicleTypes: () => get('/drivers/vehicle-types'),

  /**
   * @param {string} route  e.g. "Delhi → Moradabad"
   */
  returnSuggestions: (route) =>
    get(`/drivers/return-suggestions?route=${encodeURIComponent(route)}`),
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export const bookings = {
  /**
   * @param {{ driverId, route, date, time, tripType? }} data
   */
  create: (data) => post('/bookings', data),

  /**
   * @param {{ status?, page?, limit? }} params
   */
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
    ).toString()
    return get(`/bookings${qs ? `?${qs}` : ''}`)
  },

  getById: (id) => get(`/bookings/${id}`),

  stats: () => get('/bookings/stats'),

  cancel: (id, reason = '') => patch(`/bookings/${id}/cancel`, { reason }),

  accept: (id) => patch(`/bookings/${id}/accept`),

  reject: (id, reason = '') => patch(`/bookings/${id}/reject`, { reason }),

  complete: (id) => patch(`/bookings/${id}/complete`),
}
