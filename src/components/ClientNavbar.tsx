import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, LogOut } from "lucide-react";

const ClientNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="" className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-accent text-accent-foreground">
            <Truck className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg">
            Ezy<span className="text-accent">Tranship</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/client-dashboard" className="text-sm hover:text-accent">
            Dashboard
          </Link>
          <Link to="/vehicles" className="text-sm hover:text-accent">
            Vehicles
          </Link>
          <Link to="/how-it-works" className="text-sm hover:text-accent">
            How It Works
          </Link>

          <Button size="sm" variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default ClientNavbar;
