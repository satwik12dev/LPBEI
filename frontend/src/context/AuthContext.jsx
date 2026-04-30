import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { auth as authApi, users as usersApi } from '../api/client'
import { normalizeUser } from '../api/normalize'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ezy_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const initializing = useRef(true)

  // ── Restore session on mount ──────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('ezy_token')
    if (!token) { initializing.current = false; return }

    authApi.me()
      .then((data) => {
        const normalized = normalizeUser(data)
        setUser(normalized)
        localStorage.setItem('ezy_user', JSON.stringify(normalized))
      })
      .catch(() => {
        // Token expired or invalid — clear everything
        localStorage.removeItem('ezy_token')
        localStorage.removeItem('ezy_user')
        setUser(null)
      })
      .finally(() => { initializing.current = false })
  }, [])

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const data = await authApi.login(email, password)
      localStorage.setItem('ezy_token', data.token)
      const normalized = normalizeUser(data.user)
      setUser(normalized)
      localStorage.setItem('ezy_user', JSON.stringify(normalized))
      return normalized
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Signup ────────────────────────────────────────────────────────────────
  const signup = useCallback(async (email, password, username, role) => {
    setLoading(true)
    try {
      const data = await authApi.signup(username, email, password, role)
      localStorage.setItem('ezy_token', data.token)
      const normalized = normalizeUser(data.user)
      setUser(normalized)
      localStorage.setItem('ezy_user', JSON.stringify(normalized))
      return normalized
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {})
    localStorage.removeItem('ezy_token')
    localStorage.removeItem('ezy_user')
    setUser(null)
  }, [])

  // ── Update Profile (calls backend) ────────────────────────────────────────
  const updateProfile = useCallback(async (profileData) => {
    try {
      const updatedUser = await usersApi.updateMyProfile(profileData)
      const normalized = normalizeUser(updatedUser)
      setUser(normalized)
      localStorage.setItem('ezy_user', JSON.stringify(normalized))
      return normalized
    } catch (err) {
      throw err
    }
  }, [])

  // ── Local-only field update (for UI state like toggling) ──────────────────
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
