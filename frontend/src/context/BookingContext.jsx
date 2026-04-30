import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { bookings as bookingsApi } from '../api/client'
import { normalizeBooking } from '../api/normalize'
import { useAuth } from './AuthContext'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({ total: 0, completed: 0, upcoming: 0, cancelled: 0, pending: 0, totalEarnings: 0 })
  const [loadingBookings, setLoadingBookings] = useState(false)

  // ── Fetch bookings when user changes ──────────────────────────────────────
  const fetchBookings = useCallback(async () => {
    if (!user) { setBookings([]); return }
    setLoadingBookings(true)
    try {
      const data = await bookingsApi.list({ limit: 100 })
      const normalized = (data.bookings || []).map(normalizeBooking)
      setBookings(normalized)
    } catch (err) {
      console.error('Failed to fetch bookings:', err)
    } finally {
      setLoadingBookings(false)
    }
  }, [user])

  const fetchStats = useCallback(async () => {
    if (!user) return
    try {
      const data = await bookingsApi.stats()
      setStats(data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }, [user])

  useEffect(() => {
    fetchBookings()
    fetchStats()
  }, [fetchBookings, fetchStats])

  // ── Create Booking ────────────────────────────────────────────────────────
  const addBooking = useCallback(async (bookingData) => {
    const created = await bookingsApi.create(bookingData)
    const normalized = normalizeBooking(created)
    setBookings(prev => [normalized, ...prev])
    // Refresh stats
    fetchStats()
    return normalized
  }, [fetchStats])

  // ── Cancel Booking ────────────────────────────────────────────────────────
  const cancelBooking = useCallback(async (id, reason = '') => {
    await bookingsApi.cancel(id, reason)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
    fetchStats()
  }, [fetchStats])

  // ── Accept Request (driver) ───────────────────────────────────────────────
  const acceptRequest = useCallback(async (id) => {
    await bookingsApi.accept(id)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed', driverStatus: 'accepted' } : b))
    fetchStats()
  }, [fetchStats])

  // ── Reject Request (driver) ───────────────────────────────────────────────
  const rejectRequest = useCallback(async (id, reason = '') => {
    await bookingsApi.reject(id, reason)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'rejected', driverStatus: 'rejected' } : b))
    fetchStats()
  }, [fetchStats])

  // ── Complete Booking (driver) ─────────────────────────────────────────────
  const completeBooking = useCallback(async (id) => {
    await bookingsApi.complete(id)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'completed' } : b))
    fetchStats()
  }, [fetchStats])

  // ── Derived data helpers (bookings are already scoped by API) ─────────────
  const getClientBookings = useCallback(() => {
    return bookings
  }, [bookings])

  const getDriverRequests = useCallback(() => {
    return bookings
  }, [bookings])

  return (
    <BookingContext.Provider value={{
      bookings, stats, loadingBookings,
      addBooking, cancelBooking, acceptRequest, rejectRequest, completeBooking,
      getClientBookings, getDriverRequests,
      fetchBookings, fetchStats,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be inside BookingProvider')
  return ctx
}
