import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error: <XCircle size={18} className="text-red-500" />,
  warning: <AlertCircle size={18} className="text-yellow-500" />,
  info: <Info size={18} className="text-blue-500" />,
}

function Toast({ toast, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), toast.duration || 3500)
    return () => clearTimeout(t)
  }, [toast.id, toast.duration, onRemove])

  return (
    <div className="toast-enter flex items-start gap-3 bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 rounded-xl shadow-lg px-4 py-3 min-w-[280px] max-w-sm">
      <span className="mt-0.5 flex-shrink-0">{ICONS[toast.type] || ICONS.info}</span>
      <div className="flex-1 min-w-0">
        {toast.title && <p className="font-semibold text-sm text-ink-900 dark:text-ink-100">{toast.title}</p>}
        <p className="text-sm text-ink-600 dark:text-ink-400">{toast.message}</p>
      </div>
      <button onClick={() => onRemove(toast.id)} className="flex-shrink-0 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition-colors">
        <X size={16} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  const toast = useCallback((type, message, title, duration) => {
    const id = `t_${Date.now()}_${Math.random()}`
    setToasts(t => [...t, { id, type, message, title, duration }])
  }, [])

  const success = useCallback((msg, title) => toast('success', msg, title), [toast])
  const error = useCallback((msg, title) => toast('error', msg, title), [toast])
  const warning = useCallback((msg, title) => toast('warning', msg, title), [toast])
  const info = useCallback((msg, title) => toast('info', msg, title), [toast])

  return (
    <ToastContext.Provider value={{ success, error, warning, info }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map(t => <Toast key={t.id} toast={t} onRemove={remove} />)}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}
