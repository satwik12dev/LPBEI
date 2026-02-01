const stats = [
  { title: "Total Clients", value: 120 },
  { title: "Total Drivers", value: 45 },
  { title: "Total Bookings", value: 560 },
  { title: "Successful Trips", value: 420 },
];

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-card p-6 rounded-xl shadow-card">
            <p className="text-muted-foreground">{item.title}</p>
            <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
