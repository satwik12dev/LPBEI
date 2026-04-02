const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const clientProfileSchema = new mongoose.Schema(
  {
    name:     { type: String, trim: true },
    age:      { type: Number, min: 18, max: 100 },
    workType: { type: String, trim: true },
    phone:    { type: String, trim: true },
    city:     { type: String, trim: true },
  },
  { _id: false }
)

const driverProfileSchema = new mongoose.Schema(
  {
    name:          { type: String, trim: true },
    age:           { type: Number, min: 18, max: 100 },
    phone:         { type: String, trim: true },
    vehicleType:   { type: String, trim: true },
    vehicleNumber: { type: String, trim: true, uppercase: true },
    licenseNumber: { type: String, trim: true },
    loadCapacity:  { type: String, trim: true },
    // routes: ['Delhi → Noida', ...]
    routes: [{ type: String }],
    // fare: { 'Delhi → Noida': 800 }
    fare: {
      type: Map,
      of: Number,
      default: {},
    },
    isLive:          { type: Boolean, default: false },
    rating:          { type: Number, default: 0, min: 0, max: 5 },
    ratingCount:     { type: Number, default: 0 },
    trips:           { type: Number, default: 0 },
    completionRate:  { type: Number, default: 100 },
    badge:           { type: String, default: null },
  },
  { _id: false }
)

// ── Main User schema ──────────────────────────────────────────────────────────

const userSchema = new mongoose.Schema(
  {
    username: {
      type:     String,
      required: [true, 'Username is required'],
      trim:     true,
    },
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true,
      trim:      true,
      match:     [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    password: {
      type:     String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select:   false, // never returned by default
    },
    role: {
      type:     String,
      enum:     ['client', 'driver'],
      required: [true, 'Role is required'],
    },
    profileComplete: {
      type:    Boolean,
      default: false,
    },
    // Only one of these will be populated depending on role
    clientProfile: clientProfileSchema,
    driverProfile: driverProfileSchema,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password
        delete ret.__v
        return ret
      },
    },
  }
)

// ── Hooks ─────────────────────────────────────────────────────────────────────

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// ── Instance methods ──────────────────────────────────────────────────────────

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Convenience getter — returns whichever profile sub-doc is relevant
userSchema.virtual('profile').get(function () {
  return this.role === 'driver' ? this.driverProfile : this.clientProfile
})

// ── Indexes ───────────────────────────────────────────────────────────────────

userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ 'driverProfile.isLive': 1 })
userSchema.index({ 'driverProfile.routes': 1 })

module.exports = mongoose.model('User', userSchema)
