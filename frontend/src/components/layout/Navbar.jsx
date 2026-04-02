import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, Truck, ChevronDown, LogOut, User, LayoutDashboard } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Testimonials', href: '/#testimonials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
    setProfileOpen(false)
  }

  const dashboardPath = user?.role === 'driver' ? '/driver' : '/client'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/95 dark:bg-ink-950/95 backdrop-blur-md border-b border-ink-100 dark:border-ink-800 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck size={18} className="text-white" />
            </div>
            <span className="font-display font-800 text-xl tracking-tight text-ink-900 dark:text-white">
              Ezy<span className="text-brand-500">Tranship</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white hover:bg-ink-100 dark:hover:bg-ink-800 transition-all duration-150">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-xl text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition-all">
                  <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {(user.profile?.name || user.username || 'U').slice(0, 2).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-ink-800 dark:text-ink-200 max-w-[100px] truncate">
                    {user.profile?.name || user.username}
                  </span>
                  <ChevronDown size={14} className={`text-ink-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 card py-2 animate-fade-in">
                    <Link to={dashboardPath} onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link to={user.role === 'client' ? '/client/profile' : '/driver/profile'} onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
                      <User size={15} /> Profile
                    </Link>
                    <hr className="my-1 border-ink-100 dark:border-ink-800" />
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-ink-700 dark:text-ink-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary !py-2 !px-5 !text-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-xl text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-ink-950 border-t border-ink-100 dark:border-ink-800 px-4 py-4 animate-fade-in">
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-all">
              {link.label}
            </a>
          ))}
          {!user && (
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/login" className="btn-secondary text-center !py-2.5 text-sm">Login</Link>
              <Link to="/signup" className="btn-primary text-center !py-2.5 text-sm">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
