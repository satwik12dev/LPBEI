<h1>🚚 FleetGo / EzyTranship</h1>
<h3>Commercial Vehicle Booking Platform</h3>

<p>
FleetGo (EzyTranship) is a <strong>full-stack commercial vehicle booking platform</strong>
that connects <strong>clients</strong>, <strong>drivers</strong>, and
<strong>administrators</strong> in a single system.
The project is built with scalability, clean UI, and real-world architecture in mind.
</p>

<hr />

<h2>🌟 Features</h2>

<h3>👤 Client</h3>
<ul>
  <li>Browse available vehicles</li>
  <li>Book vehicles</li>
  <li>View booking history</li>
  <li>Multi-language support (English / Hindi)</li>
</ul>

<h3>🚚 Driver</h3>
<ul>
  <li>Driver dashboard</li>
  <li>View assigned bookings</li>
  <li>Ratings & reviews (dummy data)</li>
</ul>

<h3>🛠️ Admin</h3>
<ul>
  <li>Admin dashboard</li>
  <li>View all users (clients & drivers)</li>
  <li>Manage drivers</li>
  <li>View bookings</li>
  <li>View reviews</li>
  <li>Search & filter data</li>
</ul>

<h3>🌐 Global</h3>
<ul>
  <li>Full website auto-translation (Google Translate)</li>
  <li>Responsive UI (Mobile & Desktop)</li>
  <li>Light & Dark theme</li>
  <li>Role-based routing</li>
  <li>Protected routes</li>
</ul>

<hr />

<h2>🧱 Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React + TypeScript</li>
  <li>Vite</li>
  <li>Tailwind CSS</li>
  <li>shadcn/ui</li>
  <li>React Router DOM</li>
  <li>Lucide Icons</li>
  <li>Google Translate (full-site translation)</li>
</ul>

<h3>Backend (Planned)</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
  <li>JWT Authentication</li>
  <li>OTP Verification</li>
</ul>

<hr />

<h2>📁 Project Structure</h2>

<pre>
project-root/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── CTASection.tsx
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Auth.tsx
│   │   ├── Vehicles.tsx
│   │   ├── ClientDashboard.tsx
│   │   ├── DriverDashboard.tsx
│   │   ├── NotFound.tsx
│   │   └── admin/
│   │       ├── AdminLayout.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── Users.tsx
│   │       ├── Drivers.tsx
│   │       ├── Bookings.tsx
│   │       └── Reviews.tsx
│   │
│   ├── hooks/
│   ├── lib/
│   ├── index.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── index.html
├── tailwind.config.ts
├── package.json
└── README.md
</pre>

<hr />

<h2>🔐 Authentication (Dummy Credentials)</h2>

<p><strong>Client</strong></p>
<pre>
Email: client@test.com
Password: client123
</pre>

<p><strong>Driver</strong></p>
<pre>
Email: driver@test.com
Password: driver123
</pre>

<p><strong>Admin</strong></p>
<pre>
Email: admin@test.com
Password: admin123
</pre>

<p>
Authentication is currently frontend-based for demo purposes.
Backend authentication using OTP and JWT is planned.
</p>

<hr />

<h2>🛣️ Routing Overview</h2>

<pre>
/                    → Landing Page
/auth                → Login / Signup
/vehicles            → Vehicle Listing
/how-it-works        → How It Works
/contact             → Contact / CTA

/client-dashboard    → Client Dashboard
/driver-dashboard    → Driver Dashboard

/admin               → Admin Panel
/admin/users
/admin/drivers
/admin/bookings
/admin/reviews
</pre>

<hr />

<h2>🌍 Multi-Language Support</h2>

<ul>
  <li>Full website translation using Google Translate</li>
  <li>English & Hindi supported</li>
  <li>Custom language switch in header</li>
  <li>Chrome auto-translate bar disabled</li>
</ul>

<pre>
&lt;meta name="google" content="notranslate" /&gt;
</pre>

<hr />

<h2>🚀 Getting Started</h2>

<pre>
git clone https://github.com/your-username/fleetgo.git
cd fleetgo
npm install
npm run dev
</pre>

<p>
Application runs at:
</p>

<pre>
http://localhost:8080
</pre>

<hr />

<h2>🔮 Future Enhancements</h2>

<ul>
  <li>MongoDB backend integration</li>
  <li>OTP-based authentication</li>
  <li>JWT role-based security</li>
  <li>Real-time booking tracking</li>
  <li>Payment gateway integration</li>
  <li>Push notifications</li>
  <li>Native i18n (without Google Translate)</li>
</ul>

<hr />

<h2>👨‍💻 Author</h2>

<p>
<strong>Satwik</strong><br />
Engineering Student | Full-Stack Developer
</p>

<hr />

<h2>📜 License</h2>

<p>
This project is created for <strong>educational and demo purposes</strong>.
You are free to modify and extend it.
</p>
