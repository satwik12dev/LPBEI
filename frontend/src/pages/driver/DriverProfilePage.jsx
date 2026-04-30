import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, Truck, Hash, FileText, Package, MapPin, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Spinner } from '../../components/ui/index'
import { vehicleTypes, cities } from '../../data/mockData'

const PRESET_ROUTES = [
  'Delhi → Moradabad', 'Delhi → Noida', 'Delhi → Agra', 'Delhi → Mathura',
  'Delhi → Gurgaon', 'Delhi → Faridabad', 'Delhi → Chandigarh', 'Delhi → Jaipur',
  'Delhi → Mumbai', 'Delhi → Lucknow', 'Mumbai → Pune', 'Noida → Agra',
]

export default function DriverProfilePage() {
  const { user, updateProfile } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const [form, setForm] = useState({
    name: user?.profile?.name || user?.username || '',
    age: user?.profile?.age || '',
    phone: user?.profile?.phone || '',
    vehicleType: user?.profile?.vehicleType || '',
    vehicleNumber: user?.profile?.vehicleNumber || '',
    licenseNumber: user?.profile?.licenseNumber || '',
    loadCapacity: user?.profile?.loadCapacity || '',
    routes: user?.profile?.routes || [],
    fare: user?.profile?.fare || {},
    isLive: user?.profile?.isLive || false,
  })
  const [newRoute, setNewRoute] = useState('')
  const [newFare, setNewFare] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const addRoute = () => {
    if (!newRoute || !newFare) return
    if (form.routes.includes(newRoute)) { toast.warning('Route already added.'); return }
    setForm(f => ({
      ...f,
      routes: [...f.routes, newRoute],
      fare: { ...f.fare, [newRoute]: Number(newFare) }
    }))
    setNewRoute('')
    setNewFare('')
  }

  const removeRoute = (route) => {
    setForm(f => {
      const fare = { ...f.fare }
      delete fare[route]
      return { ...f, routes: f.routes.filter(r => r !== route), fare }
    })
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.age || form.age < 18) errs.age = 'Valid age required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    if (!form.vehicleType) errs.vehicleType = 'Vehicle type is required'
    if (!form.vehicleNumber.trim()) errs.vehicleNumber = 'Vehicle number is required'
    if (!form.licenseNumber.trim()) errs.licenseNumber = 'License number is required'
    if (!form.loadCapacity.trim()) errs.loadCapacity = 'Load capacity is required'
    if (form.routes.length === 0) errs.routes = 'Add at least one route'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) { setActiveTab(form.routes.length === 0 ? 2 : 0); return }
    setSaving(true)
    try {
      await updateProfile({ ...form, age: Number(form.age) })
      toast.success('Driver profile saved!', 'Profile Complete')
      navigate('/driver')
    } catch (err) {
      toast.error(err.message || 'Failed to save profile.')
    } finally {
      setSaving(false)
    }
  }

  const tabs = ['Personal Info', 'Vehicle Details', 'Routes & Fare']

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><Truck size={30} className="text-white" /></div>
          <h1 className="font-display font-extrabold text-3xl text-ink-900 dark:text-white mb-2">Driver Profile Setup</h1>
          <p className="text-ink-500 dark:text-ink-400">Complete your profile to start receiving booking requests</p>
        </div>

        <div className="flex gap-1 p-1 bg-ink-100 dark:bg-ink-800 rounded-xl mb-6">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-semibold transition-all ${activeTab === i ? 'bg-white dark:bg-ink-700 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'}`}>
              {i + 1}. {t}
            </button>
          ))}
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit}>
            {activeTab === 0 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="font-display font-bold text-lg text-ink-900 dark:text-white mb-4">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="label">Full Name *</label><div className="relative"><User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={`input-field pl-10 ${errors.name ? 'border-red-400' : ''}`} /></div>{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}</div>
                  <div><label className="label">Age *</label><input name="age" type="number" min="18" value={form.age} onChange={handleChange} placeholder="Your age" className={`input-field ${errors.age ? 'border-red-400' : ''}`} />{errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}</div>
                </div>
                <div><label className="label">Phone Number *</label><div className="relative"><Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9XXXXXXXXX" className={`input-field pl-10 ${errors.phone ? 'border-red-400' : ''}`} /></div>{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}</div>
                <div className="pt-2"><label className="label !mb-0">Email</label><p className="text-xs text-ink-400 mb-2">Pre-filled from your account</p><input value={user?.email || ''} readOnly className="input-field bg-ink-50 dark:bg-ink-800/50 text-ink-400 cursor-not-allowed" /></div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="font-display font-bold text-lg text-ink-900 dark:text-white mb-4">Vehicle Details</h3>
                <div><label className="label">Vehicle Type *</label><div className="relative"><Truck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><select name="vehicleType" value={form.vehicleType} onChange={handleChange} className={`input-field pl-10 appearance-none ${errors.vehicleType ? 'border-red-400' : ''}`}><option value="">Select vehicle type</option>{vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}</select></div>{errors.vehicleType && <p className="text-xs text-red-500 mt-1">{errors.vehicleType}</p>}</div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="label">Vehicle Number *</label><div className="relative"><Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} placeholder="DL01AB1234" className={`input-field pl-10 uppercase ${errors.vehicleNumber ? 'border-red-400' : ''}`} /></div>{errors.vehicleNumber && <p className="text-xs text-red-500 mt-1">{errors.vehicleNumber}</p>}</div>
                  <div><label className="label">License Number *</label><div className="relative"><FileText size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="DL-2020-XXXXXXX" className={`input-field pl-10 ${errors.licenseNumber ? 'border-red-400' : ''}`} /></div>{errors.licenseNumber && <p className="text-xs text-red-500 mt-1">{errors.licenseNumber}</p>}</div>
                </div>
                <div><label className="label">Load Capacity *</label><div className="relative"><Package size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" /><input name="loadCapacity" value={form.loadCapacity} onChange={handleChange} placeholder="e.g., 5 Ton" className={`input-field pl-10 ${errors.loadCapacity ? 'border-red-400' : ''}`} /></div>{errors.loadCapacity && <p className="text-xs text-red-500 mt-1">{errors.loadCapacity}</p>}</div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="font-display font-bold text-lg text-ink-900 dark:text-white mb-1">Routes & Fare</h3>
                <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Add the routes you cover and set your fare per trip</p>
                <div><label className="label">Quick Select Route</label><select value={newRoute} onChange={e => setNewRoute(e.target.value)} className="input-field"><option value="">Select a preset route...</option>{PRESET_ROUTES.filter(r => !form.routes.includes(r)).map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                <div className="flex gap-3">
                  <div className="flex-1"><label className="label">Fare (₹)</label><input type="number" value={newFare} onChange={e => setNewFare(e.target.value)} placeholder="e.g., 1900" className="input-field" min="0" /></div>
                  <div className="flex items-end"><button type="button" onClick={addRoute} disabled={!newRoute || !newFare} className="btn-primary flex items-center gap-2 disabled:opacity-40"><Plus size={16} /> Add</button></div>
                </div>
                {errors.routes && <p className="text-sm text-red-500">{errors.routes}</p>}
                {form.routes.length > 0 && (
                  <div className="space-y-2">
                    <label className="label">Your Routes</label>
                    {form.routes.map(route => (
                      <div key={route} className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700">
                        <div className="flex items-center gap-2 min-w-0"><MapPin size={14} className="text-brand-500 flex-shrink-0" /><span className="text-sm font-medium text-ink-800 dark:text-ink-200 truncate">{route}</span></div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-display font-bold text-sm text-brand-600 dark:text-brand-400">₹{form.fare[route]?.toLocaleString()}</span>
                          <button type="button" onClick={() => removeRoute(route)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {activeTab > 0 && (<button type="button" onClick={() => setActiveTab(t => t - 1)} className="btn-secondary flex-1">← Back</button>)}
              {activeTab < 2 ? (
                <button type="button" onClick={() => setActiveTab(t => t + 1)} className="btn-primary flex-1 flex items-center justify-center gap-2">Next <ArrowRight size={16} /></button>
              ) : (
                <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {saving ? <><Spinner size="sm" /> Saving...</> : <>Save & Go to Dashboard <ArrowRight size={16} /></>}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
