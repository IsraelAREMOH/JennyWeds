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
            setMessage("No matching guest found for this link.");
          }
        }
      } catch (err) {
        console.error("Error loading guest:", err);
        if (!cancelled)
          setMessage("Could not load RSVP details. Please try again.");
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
      setMessage("RSVP submitted successfully!");
      setGuest((prev) => ({ ...prev, rsvpStatus: status }));

      if (status?.toLowerCase() === "accepted") {
        console.log("FETCHING QR...");
        const encodedId = encodeURIComponent(uniqueId);
        const BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const { data } = await axios.get(`${BASE_URL}/guest?id=${encodedId}`);
        console.log("QR RESPONSE:", data);

        setQrUrl(data.qrUrl);
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

  // DOWNLOAD FUNCTION
  const downloadQR = async () => {
    if (!qrUrl) return;

    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${guest.firstName || "Guest"}_QR.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed. Please long-press the QR code to save.", err);
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

      <div className="relative text-gray-600 bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          X
        </button>

        {!uniqueId && (
          <div className="text-center py-6">
            <p className="text-gray-700 font-medium">
              Please use your unique invitation link to RSVP.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              If you didn’t receive one, contact us at
              <h2 className="text-[#6F4E37]">+2348060947379</h2>
              <h2 className="text-[#6F4E37]">+2349030135489</h2>
            </p>
          </div>
        )}

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {!loading && guest && !isSubmitted && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-[#6F4E37]">
              RSVP for {guest.firstName}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
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
                      className="border text-gray-600 rounded-md p-2 w-full cursor-not-allowed"
                      max="1"
                      readOnly
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

        {/* SUCCESS + QR WITH DOWNLOAD BUTTON */}
        {isSubmitted && (
          <div className="text-center mt-8 animate-fadeIn">
            <p className="text-green-700 font-bold text-lg mb-6">{message}</p>

            {qrUrl && (
              <div className="p-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-amber-900">
                  Your Entry QR Code
                </h3>

                <img
                  src={qrUrl}
                  alt="QR Code"
                  className="w-72 h-72 mx-auto border-8 border-amber-700 rounded-2xl shadow-2xl"
                />

                <div className="mt-8">
                  <button
                    onClick={downloadQR}
                    className="inline-block bg-[#6F4E37] hover:bg-amber-800 text-white font-bold text-xl py-5 px-10 rounded-2xl shadow-xl transition transform hover:scale-110"
                  >
                    DOWNLOAD QR CODE
                  </button>
                </div>

                <p className="text-gray-600 mt-4 font-medium">
                  Save to phone • Show at entrance
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
