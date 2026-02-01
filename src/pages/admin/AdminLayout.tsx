import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = () => {
  const role = localStorage.getItem("role");

  // 🔒 Protect admin routes
  if (role !== "admin") {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          {/* ✅ THIS IS REQUIRED */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
