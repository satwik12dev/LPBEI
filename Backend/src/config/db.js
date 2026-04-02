const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 7+ has these on by default, kept here for clarity
    })
    console.log(`✅  MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`)
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`)
    process.exit(1)
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️   MongoDB disconnected')
})

module.exports = connectDB
