import { 
  Car, 
  Truck, 
  Package, 
  Armchair, 
  Construction, 
  Warehouse 
} from "lucide-react";

export interface VehicleCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  priceRange: string;
  features: string[];
}

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "taxi",
    name: "Taxi & Rides",
    description: "Quick city rides and airport transfers",
    icon: Car,
    priceRange: " ₹5000 - ₹5500",
    features: ["AC", "4 Passengers", "City Routes"]
  },
  {
    id: "delivery-van",
    name: "Delivery Van",
    description: "Small packages and express deliveries",
    icon: Package,
    priceRange: "₹3000 - ₹3800",
    features: ["500kg Capacity", "Same Day", "Insured"]
  },
  {
    id: "moving-truck",
    name: "Moving Truck",
    description: "Home and office relocations",
    icon: Truck,
    priceRange: "₹2000 - ₹3500",
    features: ["Loading Help", "Large Capacity", "Secure"]
  },
  {
    id: "furniture",
    name: "Furniture Transport",
    description: "Specialized furniture moving service",
    icon: Armchair,
    priceRange: "₹7500 - ₹9000",
    features: ["Padding", "Assembly", "Careful Handling"]
  },
  {
    id: "construction",
    name: "Construction",
    description: "Heavy equipment and materials",
    icon: Construction,
    priceRange: "₹2500 - ₹5000",
    features: ["Heavy Load", "Crane Access", "Licensed"]
  },
  {
    id: "warehouse",
    name: "Cargo Freight",
    description: "Long-distance cargo transport",
    icon: Warehouse,
    priceRange: "₹8000 - ₹10000",
    features: ["Interstate", "Tracking", "Climate Control"]
  }
];
