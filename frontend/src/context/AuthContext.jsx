import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = [
  { id: 'c1', email: 'client@demo.com', password: 'demo123', role: 'client', username: 'Arjun Sharma', profileComplete: true,
    profile: { name: 'Arjun Sharma', age: 28, workType: 'E-Commerce', phone: '+91 9876543210', city: 'Delhi' } },
  { id: 'd1', email: 'driver@demo.com', password: 'demo123', role: 'driver', username: 'Ramesh Kumar', profileComplete: true,
    profile: { name: 'Ramesh Kumar', age: 35, phone: '+91 9123456789', vehicleType: 'Truck', vehicleNumber: 'DL01AB1234', licenseNumber: 'DL-2010-0098765', loadCapacity: '5 Ton', routes: ['Delhi → Moradabad', 'Delhi → Noida'], fare: { 'Delhi → Moradabad': 1900, 'Delhi → Noida': 800 }, isLive: true } },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ezy_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (!found) {
      setLoading(false)
      throw new Error('Invalid email or password')
    }
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('ezy_user', JSON.stringify(safeUser))
    setLoading(false)
    return safeUser
  }, [])

  const signup = useCallback(async (email, password, username, role) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    const exists = MOCK_USERS.find(u => u.email === email)
    if (exists) {
      setLoading(false)
      throw new Error('Email already registered')
    }
    const newUser = {
      id: `u_${Date.now()}`,
      email,
      username,
      role,
      profileComplete: false,
      profile: {},
    }
    MOCK_USERS.push({ ...newUser, password })
    setUser(newUser)
    localStorage.setItem('ezy_user', JSON.stringify(newUser))
    setLoading(false)
    return newUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('ezy_user')
  }, [])

  const updateProfile = useCallback((profileData) => {
    setUser(prev => {
      const updated = { ...prev, profile: { ...prev.profile, ...profileData }, profileComplete: true }
      localStorage.setItem('ezy_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateUserField = useCallback((field, value) => {
    setUser(prev => {
      const updated = { ...prev, [field]: value }
      localStorage.setItem('ezy_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile, updateUserField }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
