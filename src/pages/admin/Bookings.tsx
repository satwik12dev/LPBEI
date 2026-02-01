import { useState } from "react";

const bookingsData = [
  { id: "BK101", client: "Ravi", status: "completed", amount: 1200 },
  { id: "BK102", client: "Anita", status: "pending", amount: 800 },
  { id: "BK103", client: "Suresh", status: "cancelled", amount: 500 },
];

const Bookings = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = bookingsData.filter((b) => {
    const matchSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.client.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status === "all" || b.status === status;

    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bookings</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          className="border rounded-md px-3 py-2"
          placeholder="Search booking or client"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-md px-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((b, i) => (
          <div key={i} className="bg-card p-4 rounded-xl shadow-card flex justify-between">
            <div>
              <p className="font-semibold">{b.id}</p>
              <p className="text-muted-foreground">{b.client}</p>
            </div>
            <div className="text-right">
              <p className="capitalize">{b.status}</p>
              <p className="font-bold">₹{b.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
