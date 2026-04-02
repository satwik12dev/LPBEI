import { Link } from 'react-router-dom'
import { Truck, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center">
                <Truck size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Ezy<span className="text-brand-400">Tranship</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-500 mb-6">
              Smart logistics booking platform connecting businesses with reliable drivers across India.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-ink-800 hover:bg-brand-500 flex items-center justify-center text-ink-400 hover:text-white transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {['About Us', 'How It Works', 'Pricing', 'Blog', 'Careers'].map(item => (
                <li key={item}><a href="#" className="hover:text-brand-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {['Freight Booking', 'Driver Registration', 'Fleet Management', 'Route Optimization', 'Return Trip Pooling'].map(item => (
                <li key={item}><a href="#" className="hover:text-brand-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-brand-400 mt-0.5 flex-shrink-0" />
                <span>Connaught Place, New Delhi — 110001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-brand-400" />
                <a href="tel:+911800000000" className="hover:text-brand-400 transition-colors">+91 1800 000 000</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-brand-400" />
                <a href="mailto:hello@ezytranship.in" className="hover:text-brand-400 transition-colors">hello@ezytranship.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-600">© 2026 EzyTranship. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
