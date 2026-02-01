import { Search, Calendar, CreditCard, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose Vehicle",
    description: "Browse our fleet and select the perfect vehicle for your needs."
  },
  {
    icon: Calendar,
    title: "Pick Date & Time",
    description: "Select when you need the vehicle and for how long."
  },
  {
    icon: CreditCard,
    title: "Confirm & Pay",
    description: "Review your booking, confirm details, and complete payment securely."
  },
  {
    icon: Truck,
    title: "Track & Ride",
    description: "Track your driver in real-time and enjoy your journey."
  }
];

const HowItWorks = () => {
  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Book your vehicle in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] right-0 h-0.5 bg-gradient-to-r from-accent to-accent/20" />
              )}

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Step Number & Icon */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-secondary group-hover:bg-accent transition-colors duration-300 flex items-center justify-center shadow-lg">
                    <step.icon className="h-10 w-10 text-foreground group-hover:text-accent-foreground transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
