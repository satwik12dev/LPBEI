import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Truck, Sun, Moon, Menu, X, LogOut, Bell, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

export default function DashboardLayout({ children, navItems, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const displayName = user?.profile?.name || user?.username || 'User'
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 z-50 w-64 bg-white dark:bg-ink-900 border-r border-ink-100 dark:border-ink-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-ink-100 dark:border-ink-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Truck size={17} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-ink-900 dark:text-white">
              Ezy<span className="text-brand-500">Tranship</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-ink-400 hover:text-ink-600 dark:hover:text-ink-200">
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-b border-ink-100 dark:border-ink-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800">
            <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-ink-900 dark:text-white truncate">{displayName}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.href
            return (
              <Link key={item.label} to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-semibold'
                    : 'text-ink-600 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-800 hover:text-ink-900 dark:hover:text-white'
                }`}>
                <item.icon size={18} className={active ? 'text-brand-500' : ''} />
                <span className="flex-1">{item.label}</span>
                {item.badge ? <span className="badge badge-orange">{item.badge}</span> : null}
                {active && <ChevronRight size={14} />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-ink-100 dark:border-ink-800">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-ink-900 border-b border-ink-100 dark:border-ink-800 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-xl text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800">
              <Menu size={20} />
            </button>
            <h1 className="font-display font-bold text-lg text-ink-900 dark:text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full"></span>
            </button>
            <button onClick={toggle} className="p-2 rounded-xl text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
