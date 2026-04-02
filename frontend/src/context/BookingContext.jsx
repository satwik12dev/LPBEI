import { createContext, useContext, useState, useCallback } from 'react'
import { mockBookings, mockRequests } from '../data/mockData'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(mockBookings)
  const [requests, setRequests] = useState(mockRequests)

  const addBooking = useCallback((booking) => {
    const newBooking = {
      ...booking,
      id: `b_${Date.now()}`,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    }
    setBookings(prev => [newBooking, ...prev])
    // Also create a request for the driver
    const newRequest = {
      id: `r_${Date.now()}`,
      bookingId: newBooking.id,
      clientName: booking.clientName,
      clientPhone: booking.clientPhone || '+91 9876543210',
      route: booking.route,
      date: booking.date,
      time: booking.time,
      tripType: booking.tripType,
      driverId: booking.driverId,
      status: 'pending',
      fare: booking.fare,
      createdAt: new Date().toISOString(),
    }
    setRequests(prev => [newRequest, ...prev])
    return newBooking
  }, [])

  const cancelBooking = useCallback((id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
  }, [])

  const acceptRequest = useCallback((id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r))
    setBookings(prev => prev.map(b => b.id === requests.find(r => r.id === id)?.bookingId ? { ...b, status: 'confirmed' } : b))
  }, [requests])

  const rejectRequest = useCallback((id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
  }, [])

  const getClientBookings = useCallback((clientId) => {
    return bookings.filter(b => b.clientId === clientId)
  }, [bookings])

  const getDriverRequests = useCallback((driverId) => {
    return requests.filter(r => r.driverId === driverId)
  }, [requests])

  return (
    <BookingContext.Provider value={{ bookings, requests, addBooking, cancelBooking, acceptRequest, rejectRequest, getClientBookings, getDriverRequests }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be inside BookingProvider')
  return ctx
}
