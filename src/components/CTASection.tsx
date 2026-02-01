import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* For Clients */}
          <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-3xl p-8 lg:p-12 space-y-6 backdrop-blur-sm">
            <div className="p-4 rounded-2xl bg-accent/20 w-fit">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground">
              Need a Vehicle?
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Browse through hundreds of verified vehicles and book instantly. 
              Track your ride in real-time and enjoy safe, reliable transportation.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Transparent pricing
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Verified & insured drivers
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <div className="w-2 h-2 rounded-full bg-accent" />
                24/7 customer support
              </li>
            </ul>
            <Link to="/auth?mode=signup&role=client">
              <Button variant="accent" size="lg" className="mt-4 group">
                Sign Up as Client
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* For Drivers */}
          <div className="bg-accent/10 border border-accent/20 rounded-3xl p-8 lg:p-12 space-y-6 backdrop-blur-sm">
            <div className="p-4 rounded-2xl bg-primary-foreground/10 w-fit">
              <Truck className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground">
              Own a Vehicle?
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Join our network of professional drivers. Earn more with flexible schedules 
              and get access to a steady stream of booking requests.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Flexible working hours
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Weekly payouts
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Insurance coverage
              </li>
            </ul>
            <Link to="/auth?mode=signup&role=driver">
              <Button variant="hero" size="lg" className="mt-4 group">
                Join as Driver
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
