import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { VehicleCategory } from "@/lib/vehicleCategories";

interface VehicleCategoryCardProps {
  category: VehicleCategory;
  onSelect?: (category: VehicleCategory) => void;
}

const VehicleCategoryCard = ({ category, onSelect }: VehicleCategoryCardProps) => {
  const Icon = category.icon;

  return (
    <Card className="group relative overflow-hidden border-0 shadow-card hover:shadow-xl transition-all duration-500 cursor-pointer bg-card hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className="relative">
            <div className="p-4 rounded-2xl bg-secondary text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-lg">
              <Icon className="h-8 w-8" />
            </div>
            <div className="absolute -inset-2 rounded-3xl border-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>

          {/* Price */}
          <div className="text-lg font-bold text-accent">
            {category.priceRange}
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-2">
            {category.features.map((feature, index) => (
              <span 
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 group/btn"
            onClick={() => onSelect?.(category)}
          >
            Book Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCategoryCard;
