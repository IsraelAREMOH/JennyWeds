import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { fetchGuest, submitRsvp } from "../api/rsvpApi";
import Confetti from "react-confetti"; // 🎉 Add this
import { useWindowSize } from "react-use"; // 🎉 Add this

export default function RsvpModal({ isOpen, onClose, uniqueId }) {
  const [guest, setGuest] = useState(null);
  const [status, setStatus] = useState("");
  const [rsvpCount, setRsvpCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { width, height } = useWindowSize(); // 🎉 Tracks screen size for confetti

  useEffect(() => {
    if (!isOpen || !uniqueId) return;

    let cancelled = false;

    async function loadGuest() {
      setLoading(true);
      setMessage("");
      try {
        const data = await fetchGuest(uniqueId);
        console.log("🧭 Raw guest data:", data);

        const matched = Array.isArray(data)
          ? data.find((g) => g.uniqueId === uniqueId)
          : data;

        if (!cancelled) {
          if (matched) {
            setGuest(matched);
            console.log("✅ Matched Guest:", matched);

            if (matched.rsvpStatus === "pending") {
              console.log("⚠️ Guest RSVP still pending — showing form.");
            }
          } else {
            setMessage("❌ No matching guest found for this link.");
            console.warn("⚠️ Guest not found for:", uniqueId);
          }
        }
      } catch (err) {
        console.error("❌ Error loading guest:", err);
        if (!cancelled)
          setMessage("❌ Could not load RSVP details. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadGuest();
    return () => {
      cancelled = true;
    };
  }, [isOpen, uniqueId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitRsvp({ id: uniqueId, status, rsvpCount, notes });
      setMessage(res.message || "✅ RSVP submitted successfully!");
    } catch {
      setMessage("❌ Failed to submit RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto px-4 py-8 sm:py-12"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 🎉 Confetti only visible when modal is open */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={180}
        recycle={false}
        gravity={0.15}
      />

      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          ✖
        </button>

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {!loading && !message && guest && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-[#6F4E37]">
              RSVP for {guest.firstName} {guest.lastName}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium">Will you attend?</label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">-- Select an option --</option>
                  <option value="accepted">Yes, I’ll attend</option>
                  <option value="declined">No, I can’t make it</option>
                </select>
              </div>

              {status === "accepted" && (
                <>
                  <div>
                    <label className="font-medium">Number of attendees:</label>
                    <input
                      type="number"
                      className="border rounded-md p-2 w-full"
                      min="1"
                      value={rsvpCount}
                      onChange={(e) => setRsvpCount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-medium">Notes (optional):</label>
                    <textarea
                      className="border rounded-md p-2 w-full"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any special note..."
                    ></textarea>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#6F4E37] text-white w-full py-2 rounded-md hover:bg-[#8B0000] transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit RSVP"}
              </button>
            </form>
          </>
        )}

        {message && (
          <div className="text-center text-lg font-medium text-green-700 mt-4">
            {message}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
