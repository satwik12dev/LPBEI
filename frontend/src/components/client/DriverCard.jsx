import { useState } from 'react'
import { MapPin, Truck, Star, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { Stars, Avatar } from '../ui/index'
import { formatCurrency } from '../../utils/helpers'
import BookingModal from './BookingModal'

export default function DriverCard({ driver }) {
  const [expanded, setExpanded] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleBook = (route) => {
    setSelectedRoute(route)
    setModalOpen(true)
  }

  return (
    <>
      <div className={`card overflow-hidden transition-all duration-200 hover:shadow-lg ${!driver.isLive ? 'opacity-60' : ''}`}>
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <Avatar name={driver.name} size="lg" />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-ink-900 ${driver.isLive ? 'bg-green-500' : 'bg-ink-300'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-ink-900 dark:text-white truncate">{driver.name}</h3>
                  <Stars rating={driver.rating} />
                </div>
                <span className={`flex-shrink-0 badge ${driver.isLive ? 'badge-green' : 'bg-ink-100 dark:bg-ink-800 text-ink-500'}`}>
                  {driver.isLive ? '● Live' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-400">
              <Truck size={14} className="text-brand-500 flex-shrink-0" />
              <span className="truncate">{driver.vehicleType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-400">
              <Star size={14} className="text-yellow-400 flex-shrink-0" />
              <span>{driver.trips} trips</span>
            </div>
            {driver.badge && (
              <div className="flex items-center gap-2 text-sm">
                <Shield size={14} className="text-blue-500 flex-shrink-0" />
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{driver.badge}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-400">
              <span className="text-xs">📦</span>
              <span>{driver.loadCapacity}</span>
            </div>
          </div>

          {/* Routes */}
          <div className="space-y-2">
            {(expanded ? driver.routes : driver.routes.slice(0, 2)).map(route => (
              <div key={route} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800 group">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin size={13} className="text-brand-500 flex-shrink-0" />
                  <span className="text-sm text-ink-700 dark:text-ink-300 truncate">{route}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-display font-bold text-sm text-ink-900 dark:text-white">{formatCurrency(driver.fare[route])}</span>
                  <button
                    onClick={() => handleBook(route)}
                    disabled={!driver.isLive}
                    className="btn-primary !py-1.5 !px-3 !text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          {driver.routes.length > 2 && (
            <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-1 text-xs text-brand-500 hover:text-brand-600 mt-2 font-medium">
              {expanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> +{driver.routes.length - 2} more routes</>}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-ink-50 dark:bg-ink-800/50 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between">
          <span className="text-xs text-ink-400">{driver.completionRate}% completion rate</span>
          <button
            onClick={() => handleBook(driver.routes[0])}
            disabled={!driver.isLive}
            className="btn-primary !py-2 !px-4 !text-sm disabled:opacity-40 disabled:cursor-not-allowed">
            {driver.isLive ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>

      <BookingModal driver={driver} route={selectedRoute} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
