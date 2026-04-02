// Spinner
export function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  return (
    <div className={`${sizes[size]} ${className} border-2 border-ink-200 dark:border-ink-700 border-t-brand-500 rounded-full animate-spin`} />
  )
}

// Loading Page
export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-ink-950">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-ink-500 dark:text-ink-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}

// Modal
export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm modal-overlay" />
      <div className={`relative w-full ${maxWidth} card p-6 modal-content max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-ink-900 dark:text-white">{title}</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

// Empty State
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center mb-4">
        {Icon && <Icon size={28} className="text-ink-400" />}
      </div>
      <h3 className="font-display font-bold text-lg text-ink-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-ink-500 dark:text-ink-400 mb-6 max-w-xs">{description}</p>}
      {action}
    </div>
  )
}

// Avatar
export function Avatar({ name = 'U', size = 'md', className = '' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-2xl' }
  const colors = ['bg-brand-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500']
  const colorIdx = name.charCodeAt(0) % colors.length
  return (
    <div className={`${sizes[size]} ${colors[colorIdx]} ${className} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

// Star Rating
export function Stars({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(rating) ? '#f97316' : 'none'} stroke="#f97316" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-xs text-ink-500 dark:text-ink-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

// Section Header
export function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {tag && <div className={`mb-4 ${center ? 'flex justify-center' : ''}`}><span className="section-tag">{tag}</span></div>}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-900 dark:text-white mb-4">{title}</h2>
      {subtitle && <p className={`text-ink-500 dark:text-ink-400 text-lg leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>{subtitle}</p>}
    </div>
  )
}

// Stat Card
export function StatCard({ icon: Icon, label, value, color = 'brand', trend }) {
  const colors = {
    brand: 'bg-brand-50 dark:bg-brand-900/20 text-brand-500',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-500',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-500',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-500',
  }
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={20} />
        </div>
        {trend && <span className={`text-xs font-semibold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>{trend > 0 ? '+' : ''}{trend}%</span>}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-ink-900 dark:text-white">{value}</p>
        <p className="text-sm text-ink-500 dark:text-ink-400">{label}</p>
      </div>
    </div>
  )
}
