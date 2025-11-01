import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { fetchGuest, submitRsvp } from "../api/rsvpApi";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function RsvpModal({ isOpen, onClose, uniqueId }) {
  const [guest, setGuest] = useState(null);
  const [status, setStatus] = useState("");
  const [rsvpCount, setRsvpCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!isOpen || !uniqueId) return;

    let cancelled = false;

    async function loadGuest() {
      setLoading(true);
      setMessage("");
      try {
        const data = await fetchGuest(uniqueId);
        const matched = Array.isArray(data)
          ? data.find((g) => g.uniqueId === uniqueId)
          : data;

        if (!cancelled) {
          if (matched) {
            setGuest(matched);
          } else {
            setMessage(" No matching guest found for this link.");
          }
        }
      } catch (err) {
        console.error("Error loading guest:", err);
        if (!cancelled)
          setMessage(" Could not load RSVP details. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadGuest();
    return () => {
      cancelled = true;
    };
  }, [isOpen, uniqueId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guest) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await submitRsvp({
        id: uniqueId,
        status,
        rsvpCount: Number(rsvpCount),
        notes,
      });

      console.log("RSVP SUCCESS:", res);

      // Update RSVP state
      setMessage("RSVP submitted successfully!");
      setGuest((prev) => ({ ...prev, rsvpStatus: status }));

      // If accepted, fetch QR and auto-download
      if (status?.toLowerCase() === "accepted") {
        console.log("FETCHING QR...");
        const encodedId = encodeURIComponent(uniqueId);
        const BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const { data } = await axios.get(`${BASE_URL}/guest/${encodedId}/qr`);
        console.log("QR RESPONSE:", data);

        setQrUrl(data.qrUrl);

        // AUTO-DOWNLOAD LOGIC
        try {
          const response = await fetch(data.qrUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${guest.firstName || "Guest"}_QR.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          console.log("QR downloaded successfully.");
        } catch (downloadErr) {
          console.error("QR auto-download failed:", downloadErr);
        }
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("RSVP ERROR:", err.response?.data || err);
      setMessage("Failed to submit RSVP.");
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto px-4 py-8 sm:py-12"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
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

        {!loading && guest && !isSubmitted && (
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

        {isSubmitted && (
          <div className="text-center mt-4">
            <p className="text-lg font-medium text-green-700">{message}</p>
            {qrUrl && (
              <div className="mt-4">
                <p className="font-medium mb-2">Your QR Code:</p>
                <img src={qrUrl} alt="QR Code" className="mx-auto w-40 h-40" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
