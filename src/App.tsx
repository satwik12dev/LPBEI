import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import ClientDashboard from "./pages/ClientDashboard";


// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Vehicles from "./pages/Vehicles";
import NotFound from "./pages/NotFound";

// NOTE: HowItWorks is in components (your structure)
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";
import DriverDashboard from "./pages/DriverDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* ✅ NAVBAR VISIBLE ON ALL PAGES */}
        <Header />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<CTASection />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
