/**
 * Seed script — populates MongoDB with demo users and bookings.
 *
 * Usage:
 *   npm run seed
 *
 * Drops existing users and bookings before inserting fresh data.
 */

require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const User     = require('../src/models/User')
const Booking  = require('../src/models/Booking')

// ── Demo data ─────────────────────────────────────────────────────────────────

const HASH = (pw) => bcrypt.hashSync(pw, 12)

const CLIENTS = [
  {
    username: 'Arjun Sharma',
    email: 'client@demo.com',
    password: HASH('demo123'),
    role: 'client',
    profileComplete: true,
    clientProfile: {
      name: 'Arjun Sharma',
      age: 28,
      workType: 'E-Commerce',
      phone: '+91 9876543210',
      city: 'Delhi',
    },
  },
  {
    username: 'Priya Nair',
    email: 'priya@demo.com',
    password: HASH('demo123'),
    role: 'client',
    profileComplete: true,
    clientProfile: {
      name: 'Priya Nair',
      age: 34,
      workType: 'Pharmaceuticals',
      phone: '+91 9988776655',
      city: 'Mumbai',
    },
  },
]

const DRIVERS = [
  {
    username: 'Ramesh Kumar',
    email: 'driver@demo.com',
    password: HASH('demo123'),
    role: 'driver',
    profileComplete: true,
    driverProfile: {
      name: 'Ramesh Kumar',
      age: 35,
      phone: '+91 9123456789',
      vehicleType: 'Truck',
      vehicleNumber: 'DL01AB1234',
      licenseNumber: 'DL-2010-0098765',
      loadCapacity: '5 Ton',
      routes: ['Delhi → Moradabad', 'Delhi → Noida'],
      fare: new Map([['Delhi → Moradabad', 1900], ['Delhi → Noida', 800]]),
      isLive: true,
      rating: 4.8,
      ratingCount: 142,
      trips: 142,
      completionRate: 98,
      badge: 'Top Rated',
    },
  },
  {
    username: 'Suresh Yadav',
    email: 'suresh@demo.com',
    password: HASH('demo123'),
    role: 'driver',
    profileComplete: true,
    driverProfile: {
      name: 'Suresh Yadav',
      age: 41,
      phone: '+91 9234567890',
      vehicleType: 'Mini Truck',
      vehicleNumber: 'UP32CD5678',
      licenseNumber: 'UP-2015-0045678',
      loadCapacity: '2 Ton',
      routes: ['Delhi → Agra', 'Delhi → Mathura', 'Noida → Agra'],
      fare: new Map([['Delhi → Agra', 2400], ['Delhi → Mathura', 1600], ['Noida → Agra', 2100]]),
      isLive: true,
      rating: 4.6,
      ratingCount: 89,
      trips: 89,
      completionRate: 94,
      badge: 'Verified',
    },
  },
  {
    username: 'Dinesh Singh',
    email: 'dinesh@demo.com',
    password: HASH('demo123'),
    role: 'driver',
    profileComplete: true,
    driverProfile: {
      name: 'Dinesh Singh',
      age: 30,
      phone: '+91 9345678901',
      vehicleType: 'Tempo',
      vehicleNumber: 'HR26EF9012',
      licenseNumber: 'HR-2018-0067890',
      loadCapacity: '1.5 Ton',
      routes: ['Delhi → Gurgaon', 'Delhi → Faridabad', 'Gurgaon → Faridabad'],
      fare: new Map([['Delhi → Gurgaon', 600], ['Delhi → Faridabad', 700], ['Gurgaon → Faridabad', 400]]),
      isLive: false,
      rating: 4.5,
      ratingCount: 63,
      trips: 63,
      completionRate: 91,
      badge: null,
    },
  },
  {
    username: 'Mohit Verma',
    email: 'mohit@demo.com',
    password: HASH('demo123'),
    role: 'driver',
    profileComplete: true,
    driverProfile: {
      name: 'Mohit Verma',
      age: 44,
      phone: '+91 9456789012',
      vehicleType: 'Container',
      vehicleNumber: 'MH12GH3456',
      licenseNumber: 'MH-2012-0023456',
      loadCapacity: '15 Ton',
      routes: ['Delhi → Mumbai', 'Delhi → Pune', 'Mumbai → Pune'],
      fare: new Map([['Delhi → Mumbai', 18000], ['Delhi → Pune', 20000], ['Mumbai → Pune', 3500]]),
      isLive: true,
      rating: 4.9,
      ratingCount: 278,
      trips: 278,
      completionRate: 99,
      badge: 'Elite',
    },
  },
  {
    username: 'Pradeep Rao',
    email: 'pradeep@demo.com',
    password: HASH('demo123'),
    role: 'driver',
    profileComplete: true,
    driverProfile: {
      name: 'Pradeep Rao',
      age: 29,
      phone: '+91 9567890123',
      vehicleType: 'Pick-up Van',
      vehicleNumber: 'KA01IJ7890',
      licenseNumber: 'KA-2019-0089012',
      loadCapacity: '750 Kg',
      routes: ['Delhi → Chandigarh', 'Delhi → Ambala'],
      fare: new Map([['Delhi → Chandigarh', 2800], ['Delhi → Ambala', 1800]]),
      isLive: true,
      rating: 4.3,
      ratingCount: 47,
      trips: 47,
      completionRate: 88,
      badge: null,
    },
  },
  {
    username: 'Arun Mishra',
    email: 'arun@demo.com',
    password: HASH('demo123'),
    role: 'driver',
    profileComplete: true,
    driverProfile: {
      name: 'Arun Mishra',
      age: 38,
      phone: '+91 9678901234',
      vehicleType: 'Refrigerated Van',
      vehicleNumber: 'RJ14KL2345',
      licenseNumber: 'RJ-2017-0056789',
      loadCapacity: '2.5 Ton',
      routes: ['Delhi → Jaipur', 'Delhi → Ajmer', 'Jaipur → Ajmer'],
      fare: new Map([['Delhi → Jaipur', 3500], ['Delhi → Ajmer', 5200], ['Jaipur → Ajmer', 2100]]),
      isLive: false,
      rating: 4.7,
      ratingCount: 116,
      trips: 116,
      completionRate: 96,
      badge: 'Verified',
    },
  },
]

// ── Seed function ─────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅  Connected to MongoDB')

    // Wipe existing data
    await User.deleteMany({})
    await Booking.deleteMany({})
    console.log('🗑   Cleared existing users and bookings')

    // Insert users
    const insertedClients = await User.insertMany(CLIENTS)
    const insertedDrivers = await User.insertMany(DRIVERS)
    console.log(`👤  Inserted ${insertedClients.length} clients`)
    console.log(`🚛  Inserted ${insertedDrivers.length} drivers`)

    const clientArjun  = insertedClients[0]
    const driverRamesh = insertedDrivers[0]
    const driverSuresh = insertedDrivers[1]
    const driverMohit  = insertedDrivers[3]
    const driverArun   = insertedDrivers[5]

    // Seed bookings
    const BOOKINGS = [
      {
        client:      clientArjun._id,
        driver:      driverRamesh._id,
        clientName:  'Arjun Sharma',
        clientPhone: '+91 9876543210',
        driverName:  'Ramesh Kumar',
        vehicleType: 'Truck',
        route:       'Delhi → Moradabad',
        date:        '2026-04-05',
        time:        '08:00',
        tripType:    'one-way',
        fare:        1900,
        status:      'pending',
        driverStatus:'pending',
      },
      {
        client:      clientArjun._id,
        driver:      driverSuresh._id,
        clientName:  'Arjun Sharma',
        clientPhone: '+91 9876543210',
        driverName:  'Suresh Yadav',
        vehicleType: 'Mini Truck',
        route:       'Delhi → Agra',
        date:        '2026-03-15',
        time:        '07:30',
        tripType:    'return',
        fare:        4320,
        status:      'completed',
        driverStatus:'accepted',
      },
      {
        client:      clientArjun._id,
        driver:      driverMohit._id,
        clientName:  'Arjun Sharma',
        clientPhone: '+91 9876543210',
        driverName:  'Mohit Verma',
        vehicleType: 'Container',
        route:       'Delhi → Mumbai',
        date:        '2026-02-20',
        time:        '06:00',
        tripType:    'one-way',
        fare:        18000,
        status:      'cancelled',
        driverStatus:'rejected',
        cancelledBy: 'client',
      },
      {
        client:      clientArjun._id,
        driver:      driverArun._id,
        clientName:  'Arjun Sharma',
        clientPhone: '+91 9876543210',
        driverName:  'Arun Mishra',
        vehicleType: 'Refrigerated Van',
        route:       'Delhi → Jaipur',
        date:        '2026-03-25',
        time:        '09:00',
        tripType:    'one-way',
        fare:        3500,
        status:      'completed',
        driverStatus:'accepted',
      },
    ]

    const insertedBookings = await Booking.insertMany(BOOKINGS)
    console.log(`📦  Inserted ${insertedBookings.length} bookings`)

    console.log('\n🎉  Seed complete!\n')
    console.log('── Demo credentials ───────────────────────────')
    console.log('  Client  │ client@demo.com  │ demo123')
    console.log('  Driver  │ driver@demo.com  │ demo123')
    console.log('───────────────────────────────────────────────\n')
  } catch (err) {
    console.error('❌  Seed failed:', err)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()
