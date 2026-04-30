import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, List, History, User, Search, Filter, Package, CheckCircle, XCircle, Clock, RotateCcw, MapPin, Truck, X, AlertCircle } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import DriverCard from '../../components/client/DriverCard'
import { StatCard, EmptyState, Avatar, Spinner } from '../../components/ui/index'
import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { drivers as driversApi } from '../../api/client'
import { normalizeDriver } from '../../api/normalize'
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

const NAV = [
  { label: 'Dashboard', href: '/client', icon: LayoutDashboard },
  { label: 'Book a Driver', href: '/client/book', icon: Truck },
  { label: 'My Bookings', href: '/client/bookings', icon: List },
  { label: 'Profile', href: '/client/profile', icon: User },
]

function DashboardHome({ user, clientBookings, cancelBooking, stats }) {
  const toast = useToast()
  const upcoming = clientBookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed' || b.status === 'pending')
  const completed = clientBookings.filter(b => b.status === 'completed')
  const cancelled = clientBookings.filter(b => b.status === 'cancelled')
  const [returnSuggestions, setReturnSuggestions] = useState([])

  useEffect(() => {
    const routes = completed.map(b => b.route)
    if (routes.length === 0) return
    const fetchSugg = async () => {
      try {
        for (const route of routes.slice(0, 2)) {
          const data = await driversApi.returnSuggestions(route)
          if (data.suggestions?.length) {
            setReturnSuggestions(prev => {
              const newD = data.suggestions.map(normalizeDriver)
              const ids = new Set(prev.map(d => d.id))
              return [...prev, ...newD.filter(d => !ids.has(d.id))].slice(0, 2)
            })
          }
        }
      } catch {}
    }
    fetchSugg()
  }, [completed.length])

  const handleCancel = async (id) => {
    try { await cancelBooking(id); toast.success('Booking cancelled successfully.', 'Booking Cancelled') }
    catch (err) { toast.error(err.message || 'Failed to cancel booking.') }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-white">Hello, {user?.profile?.name?.split(' ')[0] || user?.username}! 👋</h2>
          <p className="text-ink-500 dark:text-ink-400 mt-1">Here's your logistics overview for today.</p>
        </div>
        <Link to="/client/book" className="btn-primary hidden sm:flex items-center gap-2"><Truck size={16} /> Book Driver</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Bookings" value={stats.total || clientBookings.length} color="brand" />
        <StatCard icon={CheckCircle} label="Completed" value={stats.completed || completed.length} color="green" trend={12} />
        <StatCard icon={Clock} label="Upcoming" value={stats.upcoming || upcoming.length} color="blue" />
        <StatCard icon={XCircle} label="Cancelled" value={stats.cancelled || cancelled.length} color="red" />
      </div>

      {returnSuggestions.length > 0 && (
        <div className="card p-6 border-brand-200 dark:border-brand-800/50 bg-gradient-to-r from-brand-50 to-orange-50 dark:from-brand-900/10 dark:to-orange-900/10">
          <div className="flex items-center gap-2 mb-4"><RotateCcw size={18} className="text-brand-500" /><h3 className="font-display font-bold text-ink-900 dark:text-white">Return Trip Pooling — Save Cost!</h3></div>
          <p className="text-sm text-ink-600 dark:text-ink-400 mb-4">Based on your completed trips, we found drivers available for return routes:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {returnSuggestions.map(d => (
              <div key={d.id} className="flex items-center gap-3 bg-white dark:bg-ink-900 rounded-xl p-4 border border-ink-100 dark:border-ink-800">
                <Avatar name={d.name} size="md" />
                <div className="flex-1 min-w-0"><p className="font-semibold text-sm text-ink-900 dark:text-white">{d.name}</p><p className="text-xs text-ink-400">{d.vehicleType}</p></div>
                <Link to="/client/book" className="btn-primary !py-1.5 !px-3 !text-xs flex-shrink-0">Book</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-ink-900 dark:text-white">Upcoming Trips</h3>
          <Link to="/client/bookings" className="text-sm text-brand-500 hover:text-brand-600 font-medium">View all</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="card p-10 text-center">
            <Package size={40} className="text-ink-300 dark:text-ink-600 mx-auto mb-3" />
            <p className="text-ink-500 dark:text-ink-400 mb-4">No upcoming trips. Book a driver to get started.</p>
            <Link to="/client/book" className="btn-primary inline-flex items-center gap-2"><Truck size={16} /> Book a Driver</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map(b => (
              <div key={b.id} className="card p-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0"><Truck size={18} className="text-brand-500" /></div>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900 dark:text-white truncate">{b.driverName}</p>
                    <div className="flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400"><MapPin size={12} className="text-brand-400" /><span className="truncate">{b.route}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-right">
                    <p className="text-xs text-ink-400">{formatDate(b.date)} · {b.time}</p>
                    <p className="font-display font-bold text-brand-600 dark:text-brand-400">{formatCurrency(b.fare)}</p>
                  </div>
                  <span className={getStatusColor(b.status)}>{getStatusLabel(b.status)}</span>
                  <button onClick={() => handleCancel(b.id)} className="text-xs text-red-500 hover:text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BookDriverPage() {
  const [search, setSearch] = useState('')
  const [vehicleFilter, setVehicleFilter] = useState('all')
  const [liveOnly, setLiveOnly] = useState(false)
  const [driverList, setDriverList] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [loadingDrivers, setLoadingDrivers] = useState(true)
  const toast = useToast()

  useEffect(() => { driversApi.vehicleTypes().then(t => setVehicleTypes(t || [])).catch(() => {}) }, [])

  useEffect(() => {
    setLoadingDrivers(true)
    const params = {}
    if (search) params.search = search
    if (vehicleFilter !== 'all') params.vehicleType = vehicleFilter
    if (liveOnly) params.liveOnly = 'true'
    driversApi.list(params)
      .then(data => setDriverList((data.drivers || []).map(normalizeDriver)))
      .catch(err => { toast.error('Failed to load drivers.'); console.error(err) })
      .finally(() => setLoadingDrivers(false))
  }, [search, vehicleFilter, liveOnly])

  return (
    <div className="space-y-6">
      <div><h2 className="font-display font-bold text-2xl text-ink-900 dark:text-white mb-1">Find a Driver</h2><p className="text-ink-500 dark:text-ink-400">Browse verified drivers by route, vehicle, and availability</p></div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, route, or vehicle..." className="input-field pl-10 w-full" /></div>
        <select value={vehicleFilter} onChange={e => setVehicleFilter(e.target.value)} className="input-field !w-auto min-w-[150px]"><option value="all">All Vehicles</option>{vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}</select>
        <button onClick={() => setLiveOnly(l => !l)} className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${liveOnly ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400'}`}><span className="w-2 h-2 rounded-full bg-green-500" />Live Only</button>
      </div>
      <p className="text-sm text-ink-500 dark:text-ink-400">{driverList.length} driver{driverList.length !== 1 ? 's' : ''} found</p>
      {loadingDrivers ? (<div className="flex items-center justify-center py-20"><Spinner size="lg" /></div>)
        : driverList.length === 0 ? (<EmptyState icon={Search} title="No drivers found" description="Try adjusting your search or filters." />)
        : (<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{driverList.map(d => <DriverCard key={d.id} driver={d} />)}</div>)}
    </div>
  )
}

function BookingsPage({ clientBookings, cancelBooking }) {
  const toast = useToast()
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? clientBookings : clientBookings.filter(b => b.status === filter)
  const handleCancel = async (id) => { try { await cancelBooking(id); toast.success('Booking cancelled.', 'Cancelled') } catch (err) { toast.error(err.message || 'Failed to cancel.') } }

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-white">My Bookings</h2>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {[['all','All'],['pending','Pending'],['confirmed','Confirmed'],['completed','Completed'],['cancelled','Cancelled']].map(([val,lbl]) => (
          <button key={val} onClick={() => setFilter(val)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${filter === val ? 'bg-brand-500 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'}`}>{lbl}</button>
        ))}
      </div>
      {filtered.length === 0 ? (<EmptyState icon={Package} title="No bookings found" description="No bookings match the selected filter." />) : (
        <div className="space-y-4">
          {filtered.map(b => (
            <div key={b.id} className="card p-5">
              <div className="flex flex-wrap items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0"><Truck size={22} className="text-brand-500" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap"><h3 className="font-display font-bold text-ink-900 dark:text-white">{b.driverName}</h3><span className={getStatusColor(b.status)}>{getStatusLabel(b.status)}</span>{b.tripType === 'return' && <span className="badge badge-orange"><RotateCcw size={10} /> Return</span>}</div>
                  <div className="flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400 mb-2"><MapPin size={13} className="text-brand-400" /> {b.route}</div>
                  <div className="flex flex-wrap gap-4 text-sm text-ink-500 dark:text-ink-400"><span>📅 {formatDate(b.date)}</span><span>🕐 {b.time}</span><span>🚛 {b.vehicleType}</span></div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <span className="font-display font-bold text-xl text-brand-600 dark:text-brand-400">{formatCurrency(b.fare)}</span>
                  {(b.status === 'upcoming' || b.status === 'confirmed' || b.status === 'pending') && (
                    <button onClick={() => handleCancel(b.id)} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><X size={13} /> Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ClientDashboard({ page = 'home' }) {
  const { user } = useAuth()
  const { getClientBookings, cancelBooking, stats } = useBooking()
  const clientBookings = getClientBookings()

  const renderPage = () => {
    switch (page) {
      case 'book': return <BookDriverPage />
      case 'bookings': return <BookingsPage clientBookings={clientBookings} cancelBooking={cancelBooking} />
      default: return <DashboardHome user={user} clientBookings={clientBookings} cancelBooking={cancelBooking} stats={stats} />
    }
  }

  const pageTitles = { home: 'Dashboard', book: 'Book a Driver', bookings: 'My Bookings' }
  return (<DashboardLayout navItems={NAV} title={pageTitles[page] || 'Dashboard'}>{renderPage()}</DashboardLayout>)
}
