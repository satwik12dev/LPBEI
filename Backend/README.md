# EzyTranship — Backend API

> Node.js · Express · MongoDB · JWT

---

## Quick Start

```bash
# 1. Install dependencies
cd ezytranship-backend
npm install

# 2. Configure environment
cp .env.example .env
#    → Edit MONGO_URI and JWT_SECRET

# 3. Seed the database with demo data
npm run seed

# 4. Start the dev server
npm run dev
```

Server starts on **http://localhost:5000**

---

## Environment Variables

| Variable          | Description                              | Default                  |
|-------------------|------------------------------------------|--------------------------|
| `PORT`            | Port the server listens on               | `5000`                   |
| `NODE_ENV`        | `development` \| `production`            | `development`            |
| `MONGO_URI`       | MongoDB connection string                | `mongodb://127.0.0.1:27017/ezytranship` |
| `JWT_SECRET`      | Secret used to sign JWTs                 | *(must be set)*          |
| `JWT_EXPIRES_IN`  | Token lifetime                           | `7d`                     |
| `CLIENT_ORIGINS`  | Comma-separated allowed CORS origins     | `http://localhost:5173`  |

---

## Demo Credentials

After running `npm run seed`:

| Role   | Email               | Password  |
|--------|---------------------|-----------|
| Client | client@demo.com     | demo123   |
| Driver | driver@demo.com     | demo123   |

---

## Project Structure

```
ezytranship-backend/
├── src/
│   ├── server.js                  ← Express app + middleware stack
│   ├── config/
│   │   └── db.js                  ← Mongoose connection
│   ├── models/
│   │   ├── User.js                ← User schema (client + driver)
│   │   └── Booking.js             ← Booking schema
│   ├── controllers/
│   │   ├── authController.js      ← signup, login, me, logout
│   │   ├── userController.js      ← profile CRUD, toggle live
│   │   ├── driverController.js    ← list, filter, return suggestions
│   │   └── bookingController.js   ← create, list, accept, reject, cancel
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── driverRoutes.js
│   │   └── bookingRoutes.js
│   ├── middleware/
│   │   ├── auth.js                ← protect + restrictTo
│   │   ├── validate.js            ← express-validator error handler
│   │   └── errorHandler.js        ← global error handler
│   └── utils/
│       ├── jwt.js                 ← signToken, verifyToken
│       ├── apiResponse.js         ← consistent response helpers
│       ├── pooling.js             ← two-way trip pooling logic
│       └── api.client.js          ← copy into frontend src/api/client.js
├── scripts/
│   └── seed.js                    ← demo data seeder
├── .env.example
├── .gitignore
└── package.json
```

---

## API Reference

All endpoints are prefixed with `/api`.

### Auth

| Method | Endpoint           | Body                                  | Auth | Description           |
|--------|--------------------|---------------------------------------|------|-----------------------|
| POST   | `/auth/signup`     | `{ username, email, password, role }` | ✗    | Create account        |
| POST   | `/auth/login`      | `{ email, password }`                 | ✗    | Login, returns JWT    |
| GET    | `/auth/me`         | —                                     | ✓    | Get current user      |
| POST   | `/auth/logout`     | —                                     | ✓    | Logout (client-side)  |

### Users / Profile

| Method | Endpoint               | Body               | Auth | Role   | Description            |
|--------|------------------------|--------------------|------|--------|------------------------|
| GET    | `/users/me/profile`    | —                  | ✓    | Any    | Get own profile        |
| PUT    | `/users/me/profile`    | profile fields     | ✓    | Any    | Update profile         |
| PATCH  | `/users/me/live`       | —                  | ✓    | Driver | Toggle live status     |
| GET    | `/users/:id`           | —                  | ✓    | Any    | Get public profile     |

**Client profile fields:** `name`, `age`, `workType`, `phone`, `city`

**Driver profile fields:** `name`, `age`, `phone`, `vehicleType`, `vehicleNumber`, `licenseNumber`, `loadCapacity`, `routes` (array), `fare` (object)

### Drivers

| Method | Endpoint                        | Query params                                    | Auth | Description                   |
|--------|---------------------------------|-------------------------------------------------|------|-------------------------------|
| GET    | `/drivers`                      | `route`, `vehicleType`, `liveOnly`, `search`, `page`, `limit` | ✓ | List & filter drivers |
| GET    | `/drivers/:id`                  | —                                               | ✓    | Single driver                 |
| GET    | `/drivers/vehicle-types`        | —                                               | ✗    | Distinct vehicle types        |
| GET    | `/drivers/return-suggestions`   | `route` *(required)*                            | ✓    | Two-way pooling matches       |

### Bookings

| Method | Endpoint                   | Body / Params                        | Auth | Role   | Description               |
|--------|----------------------------|--------------------------------------|------|--------|---------------------------|
| GET    | `/bookings/stats`          | —                                    | ✓    | Any    | Dashboard counts          |
| GET    | `/bookings`                | `status`, `page`, `limit`            | ✓    | Any    | List own bookings         |
| POST   | `/bookings`                | `{ driverId, route, date, time, tripType }` | ✓ | Client | Create booking     |
| GET    | `/bookings/:id`            | —                                    | ✓    | Any    | Single booking            |
| PATCH  | `/bookings/:id/cancel`     | `{ reason? }`                        | ✓    | Any    | Cancel booking            |
| PATCH  | `/bookings/:id/accept`     | —                                    | ✓    | Driver | Accept request            |
| PATCH  | `/bookings/:id/reject`     | `{ reason? }`                        | ✓    | Driver | Reject request            |
| PATCH  | `/bookings/:id/complete`   | —                                    | ✓    | Driver | Mark trip complete        |

### Response Envelope

All responses follow a consistent shape:

```json
// Success
{ "success": true, "message": "...", "data": { ... } }

// Error
{ "success": false, "error": "Human-readable message", "errors": [] }
```

---

## Connecting the Frontend

### 1. Add env variable to React project

Create a `.env` file in your `ezytranship` (frontend) folder:

```
VITE_API_URL=http://localhost:5000/api
```

### 2. Copy the API client

```bash
cp ezytranship-backend/src/api.client.js ezytranship/src/api/client.js
```

### 3. Update AuthContext to call real API

Replace the mock `login` and `signup` functions in `src/context/AuthContext.jsx`:

```js
import { auth as authApi, users as usersApi } from '../api/client'

// Inside AuthProvider:

const login = useCallback(async (email, password) => {
  setLoading(true)
  try {
    const data = await authApi.login(email, password)
    localStorage.setItem('ezy_token', data.token)
    setUser(data.user)
    localStorage.setItem('ezy_user', JSON.stringify(data.user))
    return data.user
  } finally {
    setLoading(false)
  }
}, [])

const signup = useCallback(async (email, password, username, role) => {
  setLoading(true)
  try {
    const data = await authApi.signup(username, email, password, role)
    localStorage.setItem('ezy_token', data.token)
    setUser(data.user)
    localStorage.setItem('ezy_user', JSON.stringify(data.user))
    return data.user
  } finally {
    setLoading(false)
  }
}, [])

const logout = useCallback(async () => {
  await authApi.logout().catch(() => {})
  localStorage.removeItem('ezy_token')
  localStorage.removeItem('ezy_user')
  setUser(null)
}, [])
```

### 4. Replace mock driver list in ClientDashboard

```js
import { drivers as driversApi } from '../api/client'

// Inside the BookDriverPage component:
const [driverList, setDriverList] = useState([])
const [loadingDrivers, setLoadingDrivers] = useState(true)

useEffect(() => {
  driversApi.list({ liveOnly: liveOnly ? 'true' : undefined, vehicleType: vehicleFilter !== 'all' ? vehicleFilter : undefined, search })
    .then(res => setDriverList(res.drivers))
    .catch(() => toast.error('Failed to load drivers.'))
    .finally(() => setLoadingDrivers(false))
}, [search, vehicleFilter, liveOnly])
```

### 5. Replace mock bookings in BookingContext

```js
import { bookings as bookingsApi } from '../api/client'

const addBooking = useCallback(async (bookingData) => {
  const booking = await bookingsApi.create(bookingData)
  setBookings(prev => [booking, ...prev])
  return booking
}, [])

const cancelBooking = useCallback(async (id) => {
  await bookingsApi.cancel(id)
  setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
}, [])
```

---

## Two-Way Pooling Logic

When a client completes a trip **A → B**, call:

```
GET /api/drivers/return-suggestions?route=A → B
```

The server reverses the route to **B → A** and returns all live drivers covering that lane. Display these to the client with a "Save cost with return trip pooling" banner.

---

## Deployment

### MongoDB Atlas (free tier)

1. Create a cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Get your connection string and paste into `MONGO_URI` in `.env`
3. Whitelist your server IP in Atlas Network Access

### Render / Railway (free hosting)

```bash
# Set these environment variables in the dashboard:
NODE_ENV=production
MONGO_URI=<your atlas uri>
JWT_SECRET=<strong random string>
CLIENT_ORIGINS=https://your-frontend.vercel.app
```

Set the start command to `npm start`.

### Vercel (frontend)

```bash
cd ezytranship   # frontend folder
echo "VITE_API_URL=https://your-backend.render.com/api" > .env.production
npm run build
# deploy the dist/ folder
```

---

## Security Notes

- Passwords are hashed with **bcrypt** (cost factor 12)
- JWTs expire after **7 days** by default (configurable)
- Auth routes are rate-limited to **30 req / 15 min**
- All routes use **Helmet** headers
- `password` field is excluded from all query results via `select: false`
- CORS is locked to origins listed in `CLIENT_ORIGINS`
