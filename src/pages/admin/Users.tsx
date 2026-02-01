import { useState } from "react";
import { Input } from "@/components/ui/input";

const usersData = [
  { name: "Ravi Kumar", email: "ravi@gmail.com", role: "client" },
  { name: "Anita Sharma", email: "anita@gmail.com", role: "client" },
  { name: "Suresh Yadav", email: "suresh@gmail.com", role: "driver" },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const filteredUsers = usersData.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = role === "all" || user.role === role;

    return matchSearch && matchRole;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-md px-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="client">Client</option>
          <option value="driver">Driver</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
