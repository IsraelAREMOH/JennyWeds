// frontend/src/pages/Admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { getGuests } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
    attended: 0,
  });
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        // load a large set and compute stats client-side
        const res = await getGuests({ page: 1, perPage: 1000 });
        const g = res.guests || [];
        const total = g.length;
        const accepted = g.filter((x) => x.rsvpStatus === "accepted").length;
        const pending = g.filter((x) => x.rsvpStatus === "pending").length;
        const attended = g.filter((x) => x.attendance).length;
        setStats({ total, accepted, pending, attended });
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <button
            onClick={() => nav("/admin/guests")}
            className="px-2 py-2 bg-[#6F4E37] text-white rounded"
          >
            Manage Guests
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Guests</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Accepted</div>
          <div className="text-2xl font-bold">{stats.accepted}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold">{stats.pending}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Checked-in</div>
          <div className="text-2xl font-bold">{stats.attended}</div>
        </div>
      </div>
    </div>
  );
}
