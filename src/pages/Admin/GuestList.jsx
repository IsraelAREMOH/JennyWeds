import { useEffect, useState, useCallback } from "react";
import {
  getGuests,
  deleteGuest,
  checkinGuest,
  exportCsv,
} from "../../api/adminApi";
import GuestForm from "./GuestForm";
import { saveAs } from "file-saver";

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(50);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getGuests({
        page,
        perPage,
        status: filterStatus || undefined,
        search: search || undefined,
      });
      setGuests(res.guests || []);
      setTotal(res.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, filterStatus, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    if (!confirm("Delete this guest?")) return;
    await deleteGuest(id);
    load();
  }

  async function handleCheckin(id) {
    try {
      await checkinGuest(id);
      load();
    } catch (e) {
      alert("Check-in failed: " + e.message);
    }
  }

  async function handleExport() {
    try {
      const blob = await exportCsv();
      saveAs(blob, "guests_export.csv");
    } catch (e) {
      alert("Export failed: " + e.message);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Guests</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="px-0 py-2 bg-green-600 text-white rounded"
          >
            Add Guest
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-gray-700 text-white rounded"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          placeholder="Search name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-0 py-1"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-0 py-1"
        >
          <option value="">All RSVP</option>
          <option value="accepted">Accepted</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
        <button
          onClick={() => load()}
          className="px-2 py-2 bg-[#6F4E37] text-white rounded"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full divide-y">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Table</th>
                  <th className="px-4 py-2">RSVP</th>
                  <th className="px-4 py-2">Attendance</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {guests.map((g) => (
                  <tr key={g._id}>
                    <td className="px-4 py-2 text-sm">{g.uniqueId}</td>
                    <td className="px-4 py-2">
                      {g.firstName} {g.lastName}
                    </td>
                    <td className="px-4 py-2">{g.email}</td>
                    <td className="px-4 py-2">{g.tableNo}</td>
                    <td className="px-4 py-2">{g.rsvpStatus}</td>
                    <td className="px-4 py-2">{g.attendance ? "Yes" : "No"}</td>
                    <td className="px-4 py-2 space-x-1">
                      <button
                        onClick={() => {
                          setEditing(g);
                          setShowForm(true);
                        }}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(g._id)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleCheckin(g._id)}
                        className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Check-in
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              Showing {guests.length} of {total}
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                Prev
              </button>
              <div>Page {page}</div>
              <button
                disabled={page * perPage >= total}
                onClick={() => setPage((p) => p + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {showForm && (
        <GuestForm
          guest={editing}
          onClose={() => {
            setShowForm(false);
            load();
          }}
        />
      )}
    </div>
  );
}
