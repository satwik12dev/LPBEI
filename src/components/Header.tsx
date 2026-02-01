import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // 🌐 Google Translate trigger
  const changeLanguage = (lang: "en" | "hi") => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;

    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-accent text-accent-foreground">
              <Truck className="h-6 w-6" />
            </div>
            <span className="font-display text-xl md:text-2xl font-bold">
              Ezy<span className="text-accent">Tranship</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isActive("/") ? "text-accent" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            <Link
              to="/vehicles"
              className={`text-sm font-medium ${
                isActive("/vehicles") ? "text-accent" : "text-muted-foreground"
              }`}
            >
              Vehicles
            </Link>

            <Link
              to="/how-it-works"
              className={`text-sm font-medium ${
                isActive("/how-it-works")
                  ? "text-accent"
                  : "text-muted-foreground"
              }`}
            >
              How It Works
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium ${
                isActive("/contact") ? "text-accent" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">

            {/* 🌐 Language Switch */}
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage("en")}
                className="px-2 py-1 border rounded text-sm"
              >
                EN
              </button>

              <button
                onClick={() => changeLanguage("hi")}
                className="px-2 py-1 border rounded text-sm"
              >
                हिंदी
              </button>
            </div>

            {/* Auth */}
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
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col gap-4 p-4">
            <Link to="/">Home</Link>
            <Link to="/vehicles">Vehicles</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/contact">Contact</Link>

            {/* Mobile Language */}
            <div className="flex gap-2 pt-3">
              <button
                onClick={() => changeLanguage("en")}
                className="flex-1 border rounded py-1"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className="flex-1 border rounded py-1"
              >
                हिंदी
              </button>
            </div>

            <Link to="/auth">
              <Button className="w-full" variant="outline">
                Log In
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="w-full" variant="accent">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
