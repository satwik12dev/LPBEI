import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { BookingProvider } from './context/BookingContext'
import ProtectedRoute from './routes/ProtectedRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ClientProfilePage from './pages/client/ClientProfilePage'
import ClientDashboard from './pages/client/ClientDashboard'
import DriverProfilePage from './pages/driver/DriverProfilePage'
import DriverDashboard from './pages/driver/DriverDashboard'
import NotFoundPage from './pages/NotFoundPage'

function RoleRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'driver' ? '/driver' : '/client'} replace />
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BookingProvider>
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<RoleRedirect />} />

              {/* Client Routes */}
              <Route path="/client" element={
                <ProtectedRoute role="client">
                  <ClientDashboard page="home" />
                </ProtectedRoute>
              } />
              <Route path="/client/book" element={
                <ProtectedRoute role="client">
                  <ClientDashboard page="book" />
                </ProtectedRoute>
              } />
              <Route path="/client/bookings" element={
                <ProtectedRoute role="client">
                  <ClientDashboard page="bookings" />
                </ProtectedRoute>
              } />
              <Route path="/client/profile" element={
                <ProtectedRoute role="client">
                  <ClientProfilePage />
                </ProtectedRoute>
              } />

              {/* Driver Routes */}
              <Route path="/driver" element={
                <ProtectedRoute role="driver">
                  <DriverDashboard page="home" />
                </ProtectedRoute>
              } />
              <Route path="/driver/requests" element={
                <ProtectedRoute role="driver">
                  <DriverDashboard page="requests" />
                </ProtectedRoute>
              } />
              <Route path="/driver/history" element={
                <ProtectedRoute role="driver">
                  <DriverDashboard page="history" />
                </ProtectedRoute>
              } />
              <Route path="/driver/profile" element={
                <ProtectedRoute role="driver">
                  <DriverProfilePage />
                </ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BookingProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
