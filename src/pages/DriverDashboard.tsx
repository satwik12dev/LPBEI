import ClientNavbar from "@/components/ClientNavbar";


const DriverDashboard = () => {
  return (
    <>
      <ClientNavbar />

      {/* Main Content */}
      <main className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-4">
            Welcome, Driver 👋
          </h1>
          <p className="text-muted-foreground">
            Manage your bookings, browse vehicles, and track rides.
          </p>

          {/* You can add cards / stats here later */}
        </div>
      </main>
    </>
  );
};

export default DriverDashboard;
