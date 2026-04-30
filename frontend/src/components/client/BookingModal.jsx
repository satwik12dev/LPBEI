import { useState } from 'react'
import { Calendar, Clock, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react'
import { Modal, Spinner, Stars } from '../ui/index'
import { useBooking } from '../../context/BookingContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { formatCurrency } from '../../utils/helpers'

export default function BookingModal({ driver, route, open, onClose }) {
  const { user } = useAuth()
  const { addBooking } = useBooking()
  const toast = useToast()
  const [step, setStep] = useState(1) // 1: form, 2: confirm
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ date: '', time: '', tripType: 'one-way' })
  const [errors, setErrors] = useState({})

  const fare = driver?.fare?.[route] || 0
  const returnFare = form.tripType === 'return' ? fare * 1.8 : fare

  const validate = () => {
    const errs = {}
    if (!form.date) errs.date = 'Date is required'
    else if (new Date(form.date) < new Date(new Date().toDateString())) errs.date = 'Date cannot be in the past'
    if (!form.time) errs.time = 'Time is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (!validate()) return
    setStep(2)
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await addBooking({
        driverId: driver.id,
        route,
        date: form.date,
        time: form.time,
        tripType: form.tripType,
      })
      toast.success(`Booking confirmed with ${driver.name}!`, 'Booking Successful')
      onClose()
      setStep(1)
      setForm({ date: '', time: '', tripType: 'one-way' })
    } catch (err) {
      toast.error(err.message || 'Failed to create booking.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setStep(1)
    setForm({ date: '', time: '', tripType: 'one-way' })
    setErrors({})
  }

  if (!driver || !route) return null

  return (
    <Modal open={open} onClose={handleClose} title={step === 1 ? 'Book Trip' : 'Confirm Booking'}>
      {/* Driver Info */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-ink-50 dark:bg-ink-800 mb-6">
        <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">{driver.avatar}</div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-ink-900 dark:text-white">{driver.name}</p>
          <Stars rating={driver.rating} />
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-lg text-ink-900 dark:text-white">{formatCurrency(fare)}</div>
          <div className="text-xs text-ink-400">{driver.vehicleType}</div>
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="text-center">
          <div className="font-bold text-ink-900 dark:text-white">{route.split(' → ')[0]}</div>
          <div className="text-xs text-ink-400">From</div>
        </div>
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 h-px bg-gradient-to-r from-brand-300 to-brand-500" />
          <ArrowRight size={16} className="text-brand-500 flex-shrink-0" />
        </div>
        <div className="text-center">
          <div className="font-bold text-ink-900 dark:text-white">{route.split(' → ')[1]}</div>
          <div className="text-xs text-ink-400">To</div>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-5">
          {/* Trip Type */}
          <div>
            <label className="label">Trip Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[{ value: 'one-way', label: 'One Way', icon: ArrowRight }, { value: 'return', label: 'Return Trip', icon: RotateCcw }].map(t => (
                <button key={t.value} type="button" onClick={() => setForm(f => ({ ...f, tripType: t.value }))}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${form.tripType === t.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400' : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-ink-300 dark:hover:border-ink-600'}`}>
                  <t.icon size={16} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {form.tripType === 'return' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 animate-fade-in">
              <RotateCcw size={14} className="text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                Save cost with return trip pooling! Return fare: {formatCurrency(Math.round(fare * 1.8))} (save 10%)
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Date *</label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]}
                  onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: '' })) }}
                  className={`input-field pl-10 ${errors.date ? 'border-red-400' : ''}`} />
              </div>
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="label">Time *</label>
              <div className="relative">
                <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="time" value={form.time}
                  onChange={e => { setForm(f => ({ ...f, time: e.target.value })); setErrors(er => ({ ...er, time: '' })) }}
                  className={`input-field pl-10 ${errors.time ? 'border-red-400' : ''}`} />
              </div>
              {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800">
            <span className="font-semibold text-ink-800 dark:text-ink-200">Total Fare</span>
            <span className="font-display font-bold text-2xl text-brand-600 dark:text-brand-400">{formatCurrency(Math.round(returnFare))}</span>
          </div>

          <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5">
            Continue <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { label: 'Trip Type', value: form.tripType === 'one-way' ? 'One Way' : 'Return Trip' },
              { label: 'Date', value: new Date(form.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) },
              { label: 'Time', value: form.time },
              { label: 'Vehicle', value: `${driver.vehicleType} · ${driver.loadCapacity}` },
              { label: 'Total Fare', value: formatCurrency(Math.round(returnFare)), highlight: true },
            ].map(row => (
              <div key={row.label} className={`flex items-center justify-between py-3 ${row.highlight ? 'border-t border-ink-100 dark:border-ink-800 pt-4 mt-2' : ''}`}>
                <span className="text-sm text-ink-500 dark:text-ink-400">{row.label}</span>
                <span className={`font-semibold ${row.highlight ? 'text-brand-600 dark:text-brand-400 font-display text-xl' : 'text-ink-900 dark:text-white'}`}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <CheckCircle size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Your booking will be sent to {driver.name}. You'll receive a confirmation once the driver accepts.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
            <button onClick={handleConfirm} disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? <><Spinner size="sm" /> Confirming...</> : <>Confirm Booking <CheckCircle size={16} /></>}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
