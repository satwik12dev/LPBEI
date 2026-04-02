export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function getStatusColor(status) {
  switch (status) {
    case 'upcoming':
    case 'confirmed': return 'badge-blue'
    case 'completed':
    case 'accepted': return 'badge-green'
    case 'cancelled':
    case 'rejected': return 'badge-red'
    case 'pending': return 'badge-orange'
    default: return 'badge-blue'
  }
}

export function getStatusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export function getReturnRoute(route) {
  if (!route) return null
  const parts = route.split(' → ')
  if (parts.length < 2) return null
  return parts.reverse().join(' → ')
}

export function getSuggestionForReturn(completedRoute, drivers) {
  const returnRoute = getReturnRoute(completedRoute)
  if (!returnRoute) return null
  return drivers.filter(d => d.routes && d.routes.includes(returnRoute) && d.isLive)
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function timeAgo(dateStr) {
  const now = new Date()
  const then = new Date(dateStr)
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
