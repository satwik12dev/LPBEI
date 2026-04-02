import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, MapPin, Briefcase, Calendar, ArrowRight, Truck } from 'lucide-react'
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"
import { Spinner } from "../../components/ui/index"
import { cities, workTypes } from "../../data/mockData"

export default function ClientProfilePage() {
  const { user, updateProfile } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: user?.profile?.name || user?.username || '',
    age: user?.profile?.age || '',
    workType: user?.profile?.workType || '',
    phone: user?.profile?.phone || '',
    city: user?.profile?.city || '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.age || form.age < 18 || form.age > 100) newErrors.age = 'Valid age required (18-100)'
    if (!form.workType) newErrors.workType = 'Work type is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone is required'
    if (!form.city) newErrors.city = 'City is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    updateProfile({ ...form, age: Number(form.age) })
    toast.success('Profile saved! Welcome aboard.', 'Profile Complete')
    setSaving(false)
    navigate('/client')
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck size={30} className="text-white" />
          </div>
          <h1 className="font-display font-extrabold text-3xl text-ink-900 dark:text-white mb-2">Complete Your Profile</h1>
          <p className="text-ink-500 dark:text-ink-400">Tell us about yourself so drivers can serve you better</p>
        </div>

        <div className="card p-8">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {['Account', 'Profile', 'Dashboard'].map((step, i) => (
              <div key={step} className="flex-1 flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i === 0 ? 'bg-green-500 text-white' : i === 1 ? 'bg-brand-500 text-white' : 'bg-ink-200 dark:bg-ink-700 text-ink-400'}`}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium ${i === 1 ? 'text-brand-500' : 'text-ink-400'}`}>{step}</span>
                {i < 2 && <div className={`absolute`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Full Name *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                    className={`input-field pl-10 ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Age *</label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input name="age" type="number" min="18" max="100" value={form.age} onChange={handleChange}
                    placeholder="Your age" className={`input-field pl-10 ${errors.age ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
              </div>
            </div>

            <div>
              <label className="label">Work / Business Type *</label>
              <div className="relative">
                <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <select name="workType" value={form.workType} onChange={handleChange}
                  className={`input-field pl-10 appearance-none cursor-pointer ${errors.workType ? 'border-red-400 focus:ring-red-400' : ''}`}>
                  <option value="">Select work type</option>
                  {workTypes.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              {errors.workType && <p className="text-xs text-red-500 mt-1">{errors.workType}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Phone Number *</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9XXXXXXXXX"
                    className={`input-field pl-10 ${errors.phone ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="label">City *</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <select name="city" value={form.city} onChange={handleChange}
                    className={`input-field pl-10 appearance-none cursor-pointer ${errors.city ? 'border-red-400 focus:ring-red-400' : ''}`}>
                    <option value="">Select city</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
            </div>

            <div className="pt-2">
              <label className="label !mb-0">Email Address</label>
              <p className="text-xs text-ink-400 mb-2">Pre-filled from your account</p>
              <input value={user?.email || ''} readOnly
                className="input-field bg-ink-50 dark:bg-ink-800/50 text-ink-400 cursor-not-allowed" />
            </div>

            <button type="submit" disabled={saving}
              className="btn-primary w-full flex items-center justify-center gap-2 !py-4 !mt-2">
              {saving ? <><Spinner size="sm" /> Saving...</> : <>Save & Go to Dashboard <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
