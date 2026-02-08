import { NavLink } from "react-router-dom";

const ClientNavbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-borderLight">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Ezy</span>
          <span className="text-navy">Tranship</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-navy">
          <NavLink to="/client/dashboard" className="hover:text-primary">
            Dashboard
          </NavLink>
          <NavLink to="/client/book" className="hover:text-primary">
            Vehicles
          </NavLink>
          <NavLink to="/client/history" className="hover:text-primary">
            Bookings
          </NavLink>
          <NavLink to="/client/profile" className="hover:text-primary">
            Profile
          </NavLink>
        </div>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          C
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
