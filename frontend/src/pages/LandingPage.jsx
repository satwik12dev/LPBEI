import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Package, MapPin, Star, Shield, Zap, Users, CheckCircle, ChevronRight, TrendingUp, Clock, RotateCcw } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { SectionHeader, Stars } from '../components/ui/index'
import { testimonials } from '../data/mockData'

const STATS = [
  { value: '12,000+', label: 'Trips Completed' },
  { value: '3,500+', label: 'Registered Drivers' },
  { value: '850+', label: 'Business Clients' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const FEATURES = [
  { icon: Zap, title: 'Instant Booking', desc: 'Book a driver in under 60 seconds. Real-time availability, no phone calls.', color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: Shield, title: 'Verified Drivers', desc: 'Every driver is background-checked, licensed, and rated by real clients.', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { icon: RotateCcw, title: 'Return Trip Pooling', desc: 'Smart suggestions to share return trips — cut your logistics cost by up to 40%.', color: 'text-brand-500 bg-brand-50 dark:bg-brand-900/20' },
  { icon: TrendingUp, title: 'Route Optimization', desc: 'Our system suggests best routes and available drivers for your specific lane.', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock support for both clients and drivers via chat or phone.', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { icon: Package, title: 'All Vehicle Types', desc: 'Tempo, mini trucks, containers, refrigerated vans — we have them all.', color: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20' },
]

const CLIENT_STEPS = [
  { step: '01', title: 'Create Account', desc: 'Sign up as a client and complete your business profile in minutes.' },
  { step: '02', title: 'Browse Drivers', desc: 'Filter by route, vehicle type, and fare. View ratings and reviews.' },
  { step: '03', title: 'Book Instantly', desc: 'Select your date, time, and trip type. Confirm with one click.' },
  { step: '04', title: 'Track & Save', desc: 'Monitor your booking history and save with return trip pooling.' },
]

const DRIVER_STEPS = [
  { step: '01', title: 'Register & Verify', desc: 'Sign up as a driver and submit your vehicle and license details.' },
  { step: '02', title: 'Set Routes & Fare', desc: 'Define the routes you cover and set your pricing.' },
  { step: '03', title: 'Go Live', desc: 'Toggle availability and start receiving booking requests instantly.' },
  { step: '04', title: 'Earn More', desc: 'Accept bookings, complete trips, and grow your income with pooling.' },
]

const VEHICLE_TYPES = [
  { icon: '🚛', label: 'Truck', sub: 'Up to 15 Ton' },
  { icon: '🚐', label: 'Mini Truck', sub: 'Up to 2 Ton' },
  { icon: '🚌', label: 'Tempo', sub: 'Up to 1.5 Ton' },
  { icon: '📦', label: 'Container', sub: 'Heavy Load' },
  { icon: '🚚', label: 'Pick-up Van', sub: 'Light Cargo' },
  { icon: '❄️', label: 'Refrigerated', sub: 'Cold Chain' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-ink-950">
      <Navbar />

      {/* Hero */}
      <section id="home" className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh dot-pattern opacity-60 dark:opacity-30" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-300/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-slow" />
              <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 font-mono">India's Smart Logistics Platform</span>
            </div>

            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-ink-900 dark:text-white mb-6 animate-fade-up animate-delay-100">
              Smart & Reliable<br />
              <span className="text-gradient">Logistics Booking</span><br />
              Platform
            </h1>

            <p className="text-xl text-ink-500 dark:text-ink-400 leading-relaxed mb-10 max-w-2xl animate-fade-up animate-delay-200">
              Book verified drivers, optimize routes, and save up to 40% with return trip pooling. The smarter way to move goods across India.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-300">
              <Link to="/signup" className="btn-primary flex items-center gap-2 text-base !px-8 !py-4 shadow-glow">
                Start Booking <ArrowRight size={18} />
              </Link>
              <Link to="/signup?role=driver" className="btn-outline flex items-center gap-2 text-base !px-8 !py-4">
                Register as Driver <Truck size={18} />
              </Link>
            </div>

            {/* Mini Stats */}
            <div className="mt-14 flex flex-wrap gap-8 animate-fade-up animate-delay-400">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-display font-extrabold text-2xl text-ink-900 dark:text-white">{s.value}</div>
                  <div className="text-sm text-ink-500 dark:text-ink-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block w-80 animate-float">
            <div className="card p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white font-bold text-lg">RK</div>
                <div>
                  <p className="font-display font-bold text-ink-900 dark:text-white">Ramesh Kumar</p>
                  <div className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /><span className="text-xs text-ink-500">4.8 · 142 trips</span></div>
                </div>
                <span className="ml-auto badge badge-green">Live</span>
              </div>
              <div className="border-t border-ink-100 dark:border-ink-800 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-400"><MapPin size={14} className="text-brand-500" /> Delhi → Moradabad</div>
                <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-400"><Truck size={14} className="text-brand-500" /> Truck · 5 Ton</div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-display font-bold text-xl text-ink-900 dark:text-white">₹1,900</span>
                  <button className="btn-primary !py-2 !px-4 !text-sm">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-12 bg-ink-50 dark:bg-ink-900/50 border-y border-ink-100 dark:border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {VEHICLE_TYPES.map(v => (
              <div key={v.label} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                <div className="text-3xl group-hover:scale-110 transition-transform">{v.icon}</div>
                <span className="text-sm font-semibold text-ink-800 dark:text-ink-200">{v.label}</span>
                <span className="text-xs text-ink-400">{v.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                tag="✦ About EzyTranship"
                title="India's Most Trusted Logistics Booking Network"
                subtitle="EzyTranship bridges the gap between businesses needing freight and drivers looking for consistent work. We've built a platform where trust, efficiency, and savings meet."
              />
              <ul className="space-y-4">
                {['Transparent pricing — no hidden charges', 'Verified, licensed drivers only', 'Smart return trip suggestions to cut costs', 'Dashboard for clients and drivers', 'Supports all load types & vehicle categories'].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-ink-600 dark:text-ink-400">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2 mt-8">
                Get Started Free <ArrowRight size={16} />
              </Link>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map(f => (
                <div key={f.title} className="card p-5 hover:shadow-lg transition-shadow duration-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${f.color}`}>
                    <f.icon size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-ink-900 dark:text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Booking Works */}
      <section id="how-it-works" className="py-24 bg-ink-50 dark:bg-ink-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="✦ How It Works"
            title="Book a Driver in 4 Simple Steps"
            subtitle="From registration to booking confirmation, EzyTranship makes freight logistics effortless for businesses of all sizes."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {CLIENT_STEPS.map((s, i) => (
              <div key={s.step} className="relative">
                {i < CLIENT_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-brand-300 to-transparent z-0" />
                )}
                <div className="card p-6 relative z-10 hover:shadow-lg transition-shadow">
                  <div className="font-mono text-4xl font-bold text-brand-100 dark:text-brand-900/50 mb-4">{s.step}</div>
                  <h3 className="font-display font-bold text-ink-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Driver Registration Steps */}
          <div className="card p-8 bg-gradient-to-br from-ink-900 to-ink-800 dark:from-ink-800 dark:to-ink-900 border-0">
            <div className="mb-8 text-center">
              <span className="section-tag !bg-white/10 !text-white border border-white/20 mb-4">For Drivers</span>
              <h3 className="font-display font-bold text-2xl text-white mt-3">Join as a Driver in 4 Steps</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DRIVER_STEPS.map(s => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-mono font-bold text-brand-400">{s.step}</span>
                  </div>
                  <h4 className="font-display font-semibold text-white mb-2">{s.title}</h4>
                  <p className="text-sm text-ink-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/signup?role=driver" className="btn-primary inline-flex items-center gap-2">
                Register as Driver <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Return Trip Pooling Feature */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-10 relative overflow-hidden border-brand-200 dark:border-brand-800/50 bg-gradient-to-br from-brand-50 to-orange-50 dark:from-brand-900/10 dark:to-orange-900/10">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="section-tag mb-4">⭐ Unique Feature</span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-900 dark:text-white mb-4">
                  Two-Way Trip Pooling System
                </h2>
                <p className="text-ink-600 dark:text-ink-400 text-lg leading-relaxed mb-6">
                  When a driver completes a trip from A→B, EzyTranship automatically suggests that same driver for the B→A route — helping clients save cost and drivers stay profitable.
                </p>
                <div className="space-y-3">
                  {['Save up to 40% on return freight costs', 'Drivers reduce empty-trip losses', 'Smarter logistics for everyone', 'Automatic suggestions in your dashboard'].map(pt => (
                    <div key={pt} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-brand-500 flex-shrink-0" />
                      <span className="text-ink-700 dark:text-ink-300 text-sm">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {/* Route card A→B */}
                <div className="bg-white dark:bg-ink-900 rounded-2xl p-5 border border-ink-100 dark:border-ink-800 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400 mb-3"><Truck size={14} className="text-brand-500" /> Trip Completed</div>
                  <div className="flex items-center gap-3">
                    <div className="text-center"><div className="font-bold text-ink-900 dark:text-white">Delhi</div><div className="text-xs text-ink-400">Origin</div></div>
                    <div className="flex-1 flex items-center"><div className="flex-1 h-px bg-brand-300" /><ArrowRight size={16} className="text-brand-500 flex-shrink-0" /></div>
                    <div className="text-center"><div className="font-bold text-ink-900 dark:text-white">Moradabad</div><div className="text-xs text-ink-400">Destination</div></div>
                  </div>
                </div>
                {/* Return suggestion */}
                <div className="bg-brand-500 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 text-sm text-brand-100 mb-3"><RotateCcw size={14} /> Return Trip Suggestion</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-center"><div className="font-bold">Moradabad</div><div className="text-xs text-brand-200">Origin</div></div>
                    <div className="flex-1 flex items-center"><div className="flex-1 h-px bg-brand-300" /><ArrowRight size={16} className="flex-shrink-0" /></div>
                    <div className="text-center"><div className="font-bold">Delhi</div><div className="text-xs text-brand-200">Destination</div></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-100 text-sm">Save cost with return trip pooling</span>
                    <span className="font-bold text-lg">₹1,900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-ink-50 dark:bg-ink-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="✦ Testimonials" title="Trusted by Thousands Across India" subtitle="Real stories from drivers and clients who've transformed their logistics with EzyTranship." center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.id} className="card p-6 flex flex-col gap-4" style={{ animationDelay: `${i * 0.1}s` }}>
                <Stars rating={t.rating} />
                <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-ink-100 dark:border-ink-800">
                  <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm text-ink-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.role} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-ink-900 dark:text-white mb-6">
            Ready to Move Smarter?
          </h2>
          <p className="text-xl text-ink-500 dark:text-ink-400 mb-10">
            Join over 4,000 businesses and drivers already on EzyTranship.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup" className="btn-primary flex items-center gap-2 text-base !px-8 !py-4 shadow-glow">
              Book Your First Shipment <ArrowRight size={18} />
            </Link>
            <Link to="/signup?role=driver" className="btn-secondary flex items-center gap-2 text-base !px-8 !py-4">
              Drive With Us <Truck size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
