import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ───────── Layouts ───────── */
import PublicLayout from "@/layouts/PublicLayout";
import AuthGuard from "@/layouts/AuthGuard";

/* ───────── Public Pages ───────── */
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Vehicles from "./pages/Vehicles";
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";
import NotFound from "./pages/NotFound";

/* ───────── Client Pages ───────── */
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProfileSetup from "./pages/client/ClientProfileSetup";
import ClientProfileView from "./pages/client/ClientProfileView";
import EditClientProfile from "./pages/client/EditClientProfile";
import DriverList from "./pages/client/DriverList";
import BookVehicle from "./pages/client/BookVehicle";
import BookingHistory from "./pages/client/BookingHistory";

/* ───────── Driver ───────── */
import DriverDashboard from "./pages/DriverDashboard";

/* ───────── Admin ───────── */
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

          {/* 🌍 PUBLIC */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<CTASection />} />
          </Route>

          {/* 🔓 AUTH */}
          <Route path="/auth" element={<Auth />} />

          {/* 🧩 ONBOARDING (NOT GUARDED) */}
          <Route path="/client/profile-setup" element={<ClientProfileSetup />} />

          {/* 🔒 PROTECTED */}
          <Route element={<AuthGuard />}>

            {/* CLIENT */}
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/client/profile" element={<ClientProfileView />} />
            <Route path="/client/profile/edit" element={<EditClientProfile />} />
            <Route path="/client/drivers" element={<DriverList />} />
            <Route path="/client/book-vehicle" element={<BookVehicle />} />
            <Route path="/client/bookings" element={<BookingHistory />} />

            {/* DRIVER */}
            <Route path="/driver-dashboard" element={<DriverDashboard />} />

            {/* ADMIN */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>

          </Route>

          {/* ❌ 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
