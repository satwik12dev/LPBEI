const drivers = [
  { name: "Suresh Yadav", vehicle: "Truck", rating: 4.6 },
  { name: "Manoj Singh", vehicle: "Mini Van", rating: 4.2 },
];

const Drivers = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Drivers</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {drivers.map((d, i) => (
          <div key={i} className="bg-card p-6 rounded-xl shadow-card">
            <h3 className="font-semibold text-lg">{d.name}</h3>
            <p className="text-muted-foreground">{d.vehicle}</p>
            <p className="mt-2">⭐ {d.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drivers;
