import ClientNavbar from "@/components/ClientNavbar";

const DriverList = () => {
  return (
    <>
      <ClientNavbar />
      <main className="pt-20 min-h-screen bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-4">Available Drivers</h1>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            Driver listing will be shown here.
          </div>
        </div>
      </main>
    </>
  );
};

export default DriverList;
