import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Truck, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Spinner } from '../components/ui/index'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname

  const handleChange = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError('') }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    try {
      const user = await login(form.email, form.password)
      toast.success('Welcome back!', 'Login successful')
      if (from) { navigate(from, { replace: true }); return }
      navigate(user.role === 'driver' ? '/driver' : '/client', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  const fillDemo = (role) => {
    if (role === 'client') setForm({ email: 'client@demo.com', password: 'demo123' })
    else setForm({ email: 'driver@demo.com', password: 'demo123' })
    setError('')
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-ink-900 dark:bg-ink-950 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <Truck size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-white">Ezy<span className="text-brand-400">Tranship</span></span>
          </Link>
          <div>
            <h2 className="font-display font-extrabold text-4xl text-white mb-4 leading-tight">
              Move goods smarter,<br /><span className="text-gradient">save more.</span>
            </h2>
            <p className="text-ink-400 text-lg leading-relaxed mb-8">
              Log in to access your dashboard, manage bookings, and discover cost-saving return trips.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[['12,000+', 'Trips Done'], ['4.8★', 'Avg Rating'], ['40%', 'Cost Savings'], ['24/7', 'Support']].map(([val, lbl]) => (
                <div key={lbl} className="glass rounded-2xl px-4 py-3">
                  <div className="font-display font-bold text-xl text-white">{val}</div>
                  <div className="text-xs text-ink-400">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-ink-600 text-sm">© 2026 EzyTranship. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Truck size={17} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-ink-900 dark:text-white">Ezy<span className="text-brand-500">Tranship</span></span>
          </Link>

          <h1 className="font-display font-extrabold text-3xl text-ink-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-ink-500 dark:text-ink-400 mb-8">Sign in to continue to your dashboard</p>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">Demo Accounts (click to fill):</p>
            <div className="flex gap-2">
              <button onClick={() => fillDemo('client')} className="flex-1 text-xs px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-700/50 font-medium transition-colors">
                👤 Client Demo
              </button>
              <button onClick={() => fillDemo('driver')} className="flex-1 text-xs px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-700/50 font-medium transition-colors">
                🚛 Driver Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6 animate-fade-in">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                  className="input-field pl-10" autoComplete="email" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label !mb-0">Password</label>
                <a href="#" className="text-xs text-brand-500 hover:text-brand-600 font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="Enter your password" className="input-field pl-10 pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5">
              {loading ? <><Spinner size="sm" /> Signing in...</> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500 dark:text-ink-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-500 hover:text-brand-600 font-semibold">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
