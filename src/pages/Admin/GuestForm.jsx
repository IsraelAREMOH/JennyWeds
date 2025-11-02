import { useEffect, useState } from "react";
import { createGuest, updateGuest } from "../../api/adminApi";

export default function GuestForm({ guest, onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    phone: "",
    tableNo: "",
    rsvpStatus: "pending",
  });
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(guest);

  useEffect(() => {
    if (guest) {
      setForm({
        firstName: guest.firstName || "",
        phone: guest.phone || "",
        tableNo: guest.tableNo?.toString() || "",
        rsvpStatus: guest.rsvpStatus || "pending",
      });
    }
  }, [guest]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // convert tableNo to a number
      const payload = { ...form, tableNo: parseInt(form.tableNo, 10) };

      if (isEdit) {
        await updateGuest(guest._id, payload);
      } else {
        await createGuest(payload);
      }

      alert("✅ Guest saved successfully");
      onClose();
    } catch (e) {
      console.error(e);
      alert("❌ Save failed: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Edit Guest" : "Add Guest"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
          {/* First Name */}
          <input
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="First name"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#A52A2A]"
          />

          {/* Phone */}
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone (e.g. +234...)"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#A52A2A]"
          />

          {/* Table Number */}
          <input
            required
            type="number"
            min="1"
            value={form.tableNo}
            onChange={(e) => setForm({ ...form, tableNo: e.target.value })}
            placeholder="Table number"
            className="border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#A52A2A]"
          />

          {/* RSVP Status */}
          <select
            value={form.rsvpStatus}
            onChange={(e) => setForm({ ...form, rsvpStatus: e.target.value })}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#A52A2A]"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 bg-[#A52A2A] text-white rounded hover:bg-[#8B0000] transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
