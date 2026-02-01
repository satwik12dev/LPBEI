import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-vehicles.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Hero Image - Right side */}
      <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full">
        <img 
          src={heroImage}
          alt="Fleet of commercial vehicles"
          className="w-full h-full object-cover object-center opacity-20 lg:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-accent">Trusted by 50,000+ customers</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-gradient">Book Any</span>
              <br />
              <span className="text-gradient-accent">Commercial Vehicle</span>
              <br />
              <span className="text-foreground">Instantly</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              From taxis to freight trucks, find the perfect vehicle for your needs. 
              Transparent pricing, verified drivers, and real-time tracking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?mode=signup&role=client">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Become a Client
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/auth?mode=signup&role=driver">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Become a Driver
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-accent mb-1">
                  <Shield className="h-5 w-5" />
                  <span className="font-bold text-2xl">100%</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Verified Drivers</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-accent mb-1">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold text-2xl">24/7</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Availability</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-accent mb-1">
                  <Star className="h-5 w-5" />
                  <span className="font-bold text-2xl">4.9</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right - Vehicle Categories Preview */}
          <div className="hidden lg:block">
            {/* This space is used by the background image */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
