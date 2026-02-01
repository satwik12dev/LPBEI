import VehicleCategoryCard from "@/components/VehicleCategoryCard";
import { vehicleCategories } from "@/lib/vehicleCategories";
import { useNavigate } from "react-router-dom";

const VehicleCategories = () => {
  const navigate = useNavigate();

  const handleSelectCategory = () => {
    navigate("/vehicles");
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Our Fleet
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Choose Your Perfect Vehicle
          </h2>
          <p className="text-lg text-muted-foreground">
            From quick city rides to heavy cargo transport, we have the right vehicle for every need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {vehicleCategories.map((category) => (
            <VehicleCategoryCard 
              key={category.id} 
              category={category}
              onSelect={handleSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;
