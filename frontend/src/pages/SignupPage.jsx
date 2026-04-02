import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Truck, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Spinner } from '../components/ui/index'

const RULES = [
  { label: 'At least 6 characters', test: v => v.length >= 6 },
  { label: 'Contains a number', test: v => /\d/.test(v) },
]

export default function SignupPage() {
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get('role') === 'driver' ? 'driver' : 'client'

  const [form, setForm] = useState({ username: '', email: '', password: '', role: defaultRole })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [agree, setAgree] = useState(false)
  const { signup, loading } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    setForm(f => ({ ...f, role: defaultRole }))
  }, [defaultRole])

  const handleChange = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError('') }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.username.trim()) { setError('Username is required.'); return }
    if (!form.email) { setError('Email is required.'); return }
    if (!form.password) { setError('Password is required.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (!agree) { setError('Please accept the terms and conditions.'); return }
    try {
      await signup(form.email, form.password, form.username, form.role)
      toast.success('Account created! Set up your profile.', 'Welcome to EzyTranship!')
      navigate(form.role === 'driver' ? '/driver/profile' : '/client/profile', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-ink-900 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <Truck size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-white">Ezy<span className="text-brand-400">Tranship</span></span>
          </Link>
          <div>
            <h2 className="font-display font-extrabold text-4xl text-white mb-4">
              Join 4,000+ businesses<br /><span className="text-gradient">moving smarter.</span>
            </h2>
            <p className="text-ink-400 text-lg mb-8">Start booking verified drivers or register your vehicle to earn more on every trip.</p>
            <div className="space-y-4">
              {['Free to sign up — no card required', 'Access to 3,500+ verified drivers', 'Smart return trip pooling from day one', 'Real-time booking & tracking dashboard'].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-brand-400 flex-shrink-0" />
                  <span className="text-ink-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-ink-600 text-sm">© 2026 EzyTranship.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Truck size={17} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-ink-900 dark:text-white">Ezy<span className="text-brand-500">Tranship</span></span>
          </Link>

          <h1 className="font-display font-extrabold text-3xl text-ink-900 dark:text-white mb-1">Create account</h1>
          <p className="text-ink-500 dark:text-ink-400 mb-8">Get started in under 2 minutes</p>

          {/* Role Toggle */}
          <div className="mb-6 p-1 bg-ink-100 dark:bg-ink-800 rounded-xl flex">
            {[{ value: 'client', label: '👤 I need a Driver', sub: 'Client' }, { value: 'driver', label: '🚛 I am a Driver', sub: 'Driver' }].map(r => (
              <button key={r.value} type="button" onClick={() => setForm(f => ({ ...f, role: r.value }))}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${form.role === r.value ? 'bg-white dark:bg-ink-700 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'}`}>
                {r.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-5 animate-fade-in">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name / Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input name="username" type="text" value={form.username} onChange={handleChange}
                  placeholder="John Doe" className="input-field pl-10" autoComplete="name" />
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className="input-field pl-10" autoComplete="email" />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="Min 6 characters" className="input-field pl-10 pr-10" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 space-y-1">
                  {RULES.map(r => (
                    <div key={r.label} className={`flex items-center gap-1.5 text-xs ${r.test(form.password) ? 'text-green-600 dark:text-green-400' : 'text-ink-400'}`}>
                      <CheckCircle size={11} className={r.test(form.password) ? 'text-green-500' : 'text-ink-300'} />
                      {r.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="agree" checked={agree} onChange={e => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-brand-500 cursor-pointer" />
              <label htmlFor="agree" className="text-sm text-ink-600 dark:text-ink-400 cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-brand-500 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-brand-500 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5 !mt-6">
              {loading ? <><Spinner size="sm" /> Creating account...</> : <>Create {form.role === 'driver' ? 'Driver' : 'Client'} Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500 dark:text-ink-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-600 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
