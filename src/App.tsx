import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import AuthGuard from "@/layouts/AuthGuard";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Vehicles from "./pages/Vehicles";
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";
import ClientDashboard from "./pages/ClientDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import NotFound from "./pages/NotFound";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Drivers from "./pages/admin/Drivers";
import Bookings from "./pages/admin/Bookings";
import Reviews from "./pages/admin/Reviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* 🌍 PUBLIC (NO LOGIN) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
          </Route>

          {/* 🔓 AUTH */}
          <Route path="/auth" element={<Auth />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route element={<AuthGuard />}>

            {/* Public UI after login */}
            <Route element={<PublicLayout />}>
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<CTASection />} />
            </Route>

            {/* Dashboards */}
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>

          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
