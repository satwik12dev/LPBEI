import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-card border-r p-5 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-accent">Admin Panel</h2>

      <nav className="space-y-4">
        <Link to="/admin" className="block hover:text-accent">Dashboard</Link>
        <Link to="/admin/users" className="block hover:text-accent">Clients</Link>
        <Link to="/admin/drivers" className="block hover:text-accent">Drivers</Link>
        <Link to="/admin/bookings" className="block hover:text-accent">Bookings</Link>
        <Link to="/admin/reviews" className="block hover:text-accent">Reviews</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
