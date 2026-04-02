import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, List, History, User, Truck, MapPin, Package, CheckCircle, XCircle, Clock, Phone, RotateCcw, TrendingUp, DollarSign, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { StatCard, EmptyState, Avatar, Stars } from '../../components/ui/index'
import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { useToast } from '../../context/ToastContext'
import { formatDate, formatCurrency, getStatusColor, getStatusLabel, getReturnRoute, getSuggestionForReturn } from '../../utils/helpers'
import { mockDrivers } from '../../data/mockData'

const NAV = [
  { label: 'Dashboard', href: '/driver', icon: LayoutDashboard },
  { label: 'Booking Requests', href: '/driver/requests', icon: List },
  { label: 'Trip History', href: '/driver/history', icon: History },
  { label: 'Profile', href: '/driver/profile', icon: User },
]

function GoLiveToggle({ isLive, onToggle }) {
  return (
    <button onClick={onToggle}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${isLive ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30' : 'bg-ink-200 dark:bg-ink-700 text-ink-700 dark:text-ink-300 hover:bg-ink-300 dark:hover:bg-ink-600'}`}>
      {isLive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
      {isLive ? '● You are Live' : 'Go Live'}
    </button>
  )
}

function DriverDashboardHome({ user, driverRequests }) {
  const { updateProfile } = useAuth()
  const toast = useToast()
  const isLive = user?.profile?.isLive || false
  const pending = driverRequests.filter(r => r.status === 'pending')
  const accepted = driverRequests.filter(r => r.status === 'accepted')
  const rejected = driverRequests.filter(r => r.status === 'rejected')

  const totalEarnings = accepted.reduce((sum, r) => sum + (r.fare || 0), 0)

  const handleToggleLive = () => {
    updateProfile({ isLive: !isLive })
    toast.success(isLive ? 'You are now offline.' : 'You are now live! Accepting bookings.', isLive ? 'Gone Offline' : 'Gone Live!')
  }

  // Return trip suggestions for completed trips
  const completedRoutes = accepted.map(r => r.route)
  const returnRoutes = completedRoutes.map(route => getReturnRoute(route)).filter(Boolean)

  return (
    <div className="space-y-8">
      {/* Welcome + Live Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-white">
            Hello, {user?.profile?.name?.split(' ')[0] || user?.username}! 🚛
          </h2>
          <p className="text-ink-500 dark:text-ink-400 mt-1">Manage your bookings and availability</p>
        </div>
        <GoLiveToggle isLive={isLive} onToggle={handleToggleLive} />
      </div>

      {/* Status Banner */}
      {!isLive && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <AlertCircle size={18} className="text-yellow-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-yellow-700 dark:text-yellow-400">You are currently offline</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-500">Toggle "Go Live" to start receiving booking requests from clients.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Requests" value={driverRequests.length} color="brand" />
        <StatCard icon={CheckCircle} label="Accepted" value={accepted.length} color="green" />
        <StatCard icon={Clock} label="Pending" value={pending.length} color="blue" />
        <StatCard icon={DollarSign} label="Total Earned" value={`₹${(totalEarnings / 1000).toFixed(1)}k`} color="purple" trend={8} />
      </div>

      {/* Pending Requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-ink-900 dark:text-white">
            Pending Requests
            {pending.length > 0 && <span className="ml-2 badge badge-orange">{pending.length}</span>}
          </h3>
          <Link to="/driver/requests" className="text-sm text-brand-500 hover:text-brand-600 font-medium">View all</Link>
        </div>

        {pending.length === 0 ? (
          <div className="card p-10 text-center">
            <Package size={36} className="text-ink-300 dark:text-ink-600 mx-auto mb-3" />
            <p className="text-ink-500 dark:text-ink-400">No pending requests. {isLive ? 'Waiting for bookings...' : 'Go live to receive requests.'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.slice(0, 3).map(r => <RequestCard key={r.id} request={r} showActions />)}
          </div>
        )}
      </div>

      {/* Return Trip Suggestion */}
      {returnRoutes.length > 0 && (
        <div className="card p-6 border-brand-200 dark:border-brand-800/50 bg-gradient-to-r from-brand-50 to-orange-50 dark:from-brand-900/10 dark:to-orange-900/10">
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw size={18} className="text-brand-500" />
            <h3 className="font-display font-bold text-ink-900 dark:text-white">Return Trip Opportunity</h3>
          </div>
          <p className="text-sm text-ink-600 dark:text-ink-400 mb-3">
            You have completed trips. These return routes could be available for pooling:
          </p>
          <div className="flex flex-wrap gap-2">
            {returnRoutes.slice(0, 4).map(r => (
              <span key={r} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 text-sm font-medium text-ink-700 dark:text-ink-300">
                <MapPin size={12} className="text-brand-500" /> {r}
              </span>
            ))}
          </div>
          <p className="text-xs text-brand-600 dark:text-brand-400 mt-3 font-medium">💡 Save cost with return trip pooling!</p>
        </div>
      )}

      {/* Driver Profile Summary */}
      {user?.profile?.vehicleType && (
        <div className="card p-6">
          <h3 className="font-display font-bold text-lg text-ink-900 dark:text-white mb-4">Your Vehicle Info</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Truck, label: 'Vehicle Type', value: user.profile.vehicleType },
              { icon: Package, label: 'Vehicle Number', value: user.profile.vehicleNumber },
              { icon: TrendingUp, label: 'Load Capacity', value: user.profile.loadCapacity },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-3.5 rounded-xl bg-ink-50 dark:bg-ink-800">
                <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <Icon size={16} className="text-brand-500" />
                </div>
                <div>
                  <p className="text-xs text-ink-400">{label}</p>
                  <p className="font-semibold text-sm text-ink-900 dark:text-white">{value || '—'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RequestCard({ request, showActions }) {
  const { acceptRequest, rejectRequest } = useBooking()
  const toast = useToast()
  const [loading, setLoading] = useState(null)

  const handleAccept = async () => {
    setLoading('accept')
    await new Promise(r => setTimeout(r, 500))
    acceptRequest(request.id)
    toast.success(`Booking from ${request.clientName} accepted!`, 'Booking Accepted')
    setLoading(null)
  }

  const handleReject = async () => {
    setLoading('reject')
    await new Promise(r => setTimeout(r, 400))
    rejectRequest(request.id)
    toast.warning(`Booking from ${request.clientName} rejected.`, 'Booking Rejected')
    setLoading(null)
  }

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start gap-4">
        <Avatar name={request.clientName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-display font-bold text-ink-900 dark:text-white">{request.clientName}</h4>
            {request.tripType === 'return' && <span className="badge badge-orange"><RotateCcw size={10} /> Return</span>}
            <span className={getStatusColor(request.status)}>{getStatusLabel(request.status)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400 mb-2">
            <MapPin size={13} className="text-brand-400" /> {request.route}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-ink-400">
            <span>📅 {formatDate(request.date)} · {request.time}</span>
            <span className="flex items-center gap-1"><Phone size={11} /> {request.clientPhone}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-display font-bold text-xl text-brand-600 dark:text-brand-400">{formatCurrency(request.fare)}</span>
          {showActions && request.status === 'pending' && (
            <div className="flex gap-2">
              <button onClick={handleReject} disabled={loading === 'accept'}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-40">
                {loading === 'reject' ? '...' : 'Reject'}
              </button>
              <button onClick={handleAccept} disabled={loading === 'reject'}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all disabled:opacity-40">
                {loading === 'accept' ? '...' : 'Accept'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function RequestsPage({ driverRequests }) {
  const [filter, setFilter] = useState('pending')
  const filtered = filter === 'all' ? driverRequests : driverRequests.filter(r => r.status === filter)

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-white">Booking Requests</h2>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {[['all', 'All'], ['pending', 'Pending'], ['accepted', 'Accepted'], ['rejected', 'Rejected']].map(([val, lbl]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${filter === val ? 'bg-brand-500 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'}`}>
            {lbl}
            {val === 'pending' && driverRequests.filter(r => r.status === 'pending').length > 0 &&
              <span className="ml-1.5 badge badge-orange !px-1.5">{driverRequests.filter(r => r.status === 'pending').length}</span>}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="No requests" description="No booking requests match this filter." />
      ) : (
        <div className="space-y-4">
          {filtered.map(r => <RequestCard key={r.id} request={r} showActions={r.status === 'pending'} />)}
        </div>
      )}
    </div>
  )
}

function HistoryPage({ driverRequests }) {
  const completed = driverRequests.filter(r => r.status === 'accepted')
  const totalEarnings = completed.reduce((sum, r) => sum + (r.fare || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-white">Trip History</h2>
        <div className="text-right">
          <p className="text-xs text-ink-400">Total Earned</p>
          <p className="font-display font-bold text-xl text-brand-600 dark:text-brand-400">{formatCurrency(totalEarnings)}</p>
        </div>
      </div>
      {completed.length === 0 ? (
        <EmptyState icon={History} title="No completed trips" description="Accepted bookings will appear here." />
      ) : (
        <div className="space-y-4">
          {completed.map(r => (
            <div key={r.id} className="card p-5 flex flex-wrap items-center gap-4">
              <Avatar name={r.clientName} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink-900 dark:text-white">{r.clientName}</p>
                <div className="flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400">
                  <MapPin size={13} className="text-brand-400" /> {r.route}
                </div>
                <p className="text-xs text-ink-400 mt-1">📅 {formatDate(r.date)} · {r.time}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-lg text-green-600 dark:text-green-400">{formatCurrency(r.fare)}</p>
                <span className="badge badge-green">Completed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DriverDashboard({ page = 'home' }) {
  const { user } = useAuth()
  const { getDriverRequests } = useBooking()
  const driverRequests = getDriverRequests(user?.id || 'd1')

  const pageTitles = { home: 'Dashboard', requests: 'Booking Requests', history: 'Trip History' }

  const renderPage = () => {
    switch (page) {
      case 'requests': return <RequestsPage driverRequests={driverRequests} />
      case 'history': return <HistoryPage driverRequests={driverRequests} />
      default: return <DriverDashboardHome user={user} driverRequests={driverRequests} />
    }
  }

  const pendingCount = driverRequests.filter(r => r.status === 'pending').length
  const navWithBadge = NAV.map(n => n.href === '/driver/requests' && pendingCount > 0 ? { ...n, badge: pendingCount } : n)

  return (
    <DashboardLayout navItems={navWithBadge} title={pageTitles[page] || 'Dashboard'}>
      {renderPage()}
    </DashboardLayout>
  )
}
