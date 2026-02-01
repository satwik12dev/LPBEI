import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-accent text-accent-foreground shadow-lg group-hover:shadow-xl transition-shadow">
              <Truck className="h-6 w-6" />
            </div>
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              Ezy<span className="text-accent">Tranship</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/') ? 'text-accent' : 'text-muted-foreground'}`}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/vehicles') ? 'text-accent' : 'text-muted-foreground'}`}
            >
              Vehicles
            </Link>
            <Link 
              to="/how-it-works" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/how-it-works') ? 'text-accent' : 'text-muted-foreground'}`}
            >
              How It Works
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/contact') ? 'text-accent' : 'text-muted-foreground'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button variant="accent" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-slide-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-sm font-medium py-2 hover:text-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className="text-sm font-medium py-2 hover:text-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-sm font-medium py-2 hover:text-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium py-2 hover:text-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex gap-3 pt-4 border-t border-border">
              <Link to="/auth" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/auth?mode=signup" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button variant="accent" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
