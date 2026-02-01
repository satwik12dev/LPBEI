import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCategoryCard from "@/components/VehicleCategoryCard";
import { vehicleCategories, VehicleCategory } from "@/lib/vehicleCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Vehicles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSelectCategory = (category: VehicleCategory) => {
    setSelectedCategory(category.id);
  };

  const handleBooking = () => {
    if (!selectedCategory || !pickup || !dropoff || !date || !time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all booking details.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Request",
      description: "Please sign in to complete your booking.",
    });
    navigate("/auth?mode=signup");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Browse Vehicles
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a vehicle category and enter your trip details to get started
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Book Your Ride</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Category */}
                  {selectedCategory && (
                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <p className="text-sm text-muted-foreground mb-1">Selected Vehicle</p>
                      <p className="font-semibold text-accent">
                        {vehicleCategories.find(c => c.id === selectedCategory)?.name}
                      </p>
                    </div>
                  )}

                  {/* Pickup Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent" />
                      <Input 
                        placeholder="Enter pickup address"
                        className="pl-10"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Drop-off Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Drop-off Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Enter drop-off address"
                        className="pl-10"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="date"
                          className="pl-10"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="time"
                          className="pl-10"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full mt-4"
                    onClick={handleBooking}
                    disabled={!selectedCategory}
                  >
                    Continue Booking
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Vehicle Categories */}
            <div className="lg:col-span-2">
              {/* Search */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search vehicle types..."
                  className="pl-12 h-12 text-base"
                />
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {vehicleCategories.map((category) => (
                  <div 
                    key={category.id}
                    className={`cursor-pointer transition-all ${
                      selectedCategory === category.id 
                        ? "ring-2 ring-accent ring-offset-2 rounded-2xl" 
                        : ""
                    }`}
                    onClick={() => handleSelectCategory(category)}
                  >
                    <VehicleCategoryCard 
                      category={category}
                      onSelect={handleSelectCategory}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Vehicles;
