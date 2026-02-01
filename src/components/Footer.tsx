import { Truck, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-accent text-accent-foreground">
                <Truck className="h-6 w-6" />
              </div>
              <span className="font-display text-2xl font-bold">
                Ezy<span className="text-accent">Tranship</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted partner for all commercial vehicle bookings. From taxis to trucks, we've got you covered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/vehicles" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Browse Vehicles</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link to="/auth" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Driver Registration</Link></li>
              <li><Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Vehicle Types</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-primary-foreground/70">Taxi & Ride Services</span></li>
              <li><span className="text-sm text-primary-foreground/70">Delivery Vans</span></li>
              <li><span className="text-sm text-primary-foreground/70">Moving Trucks</span></li>
              <li><span className="text-sm text-primary-foreground/70">Cargo Transport</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 text-accent" />
                support@fleetgo.com
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 text-accent" />
                +(91) 98765 43210
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 text-accent" />
                XYZ
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/50">
              © 2026 EzyTranship. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
