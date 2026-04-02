const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    client: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    driver: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },

    // Denormalised snapshot — so history still makes sense if profiles change
    clientName:  { type: String },
    clientPhone: { type: String },
    driverName:  { type: String },
    vehicleType: { type: String },

    route: {
      type:     String,
      required: [true, 'Route is required'],
      trim:     true,
    },
    date: {
      type:     String,          // stored as 'YYYY-MM-DD'
      required: [true, 'Date is required'],
    },
    time: {
      type:     String,          // stored as 'HH:MM'
      required: [true, 'Time is required'],
    },
    tripType: {
      type:    String,
      enum:    ['one-way', 'return'],
      default: 'one-way',
    },
    fare: {
      type:     Number,
      required: true,
      min:      0,
    },

    // Lifecycle status
    status: {
      type:    String,
      enum:    ['pending', 'confirmed', 'upcoming', 'completed', 'cancelled', 'rejected'],
      default: 'pending',
    },

    // Driver's response
    driverStatus: {
      type:    String,
      enum:    ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },

    cancelledBy: {
      type: String,
      enum: ['client', 'driver', null],
      default: null,
    },
    cancelReason: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v
        return ret
      },
    },
  }
)

// ── Indexes ───────────────────────────────────────────────────────────────────

bookingSchema.index({ client: 1, status: 1 })
bookingSchema.index({ driver: 1, driverStatus: 1 })
bookingSchema.index({ route: 1 })
bookingSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Booking', bookingSchema)
