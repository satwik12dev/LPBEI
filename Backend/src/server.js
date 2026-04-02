require('dotenv').config()
require('express-async-errors')   // patches async route handlers to forward errors

const express    = require('express')
const helmet     = require('helmet')
const cors       = require('cors')
const morgan     = require('morgan')
const rateLimit  = require('express-rate-limit')

const connectDB      = require('./config/db')
const errorHandler   = require('./middleware/errorHandler')

const authRoutes    = require('./routes/authRoutes')
const userRoutes    = require('./routes/userRoutes')
const driverRoutes  = require('./routes/driverRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB()

// ── Create app ────────────────────────────────────────────────────────────────
const app = express()

// ── Security middleware ───────────────────────────────────────────────────────
app.use(helmet())

// CORS — allow origins listed in .env
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin "${origin}" is not allowed.`))
    },
    credentials: true,
  })
)

// ── General middleware ────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Strict limit on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 30,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// General API limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/auth', authLimiter)
app.use('/api',      apiLimiter)

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'EzyTranship API is running',
    env:     process.env.NODE_ENV,
    time:    new Date().toISOString(),
  })
})

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/users',    userRoutes)
app.use('/api/drivers',  driverRoutes)
app.use('/api/bookings', bookingRoutes)

// ── 404 for unknown API routes ────────────────────────────────────────────────
app.use('/api/*', (_req, res) => {
  res.status(404).json({ success: false, error: 'API route not found.' })
})

// ── Global error handler (must be last) ──────────────────────────────────────
app.use(errorHandler)

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀  EzyTranship API listening on port ${PORT}  [${process.env.NODE_ENV}]`)
})

module.exports = app   // exported for testing
