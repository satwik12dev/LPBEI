import { Link } from 'react-router-dom'
import { ArrowLeft, Truck } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-ink-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Truck size={36} className="text-brand-500" />
        </div>
        <h1 className="font-display font-extrabold text-8xl text-brand-500 mb-4">404</h1>
        <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-white mb-3">Page Not Found</h2>
        <p className="text-ink-500 dark:text-ink-400 mb-8">
          Looks like this route doesn't exist. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Go Back Home
        </Link>
      </div>
    </div>
  )
}
