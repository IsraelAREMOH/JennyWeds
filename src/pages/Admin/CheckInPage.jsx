import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";
import { validateGuest } from "../../api/adminApi";
import confetti from "canvas-confetti";

export default function CheckInPage() {
  const [result, setResult] = useState(null);
  const [manualId, setManualId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [facingMode, setFacingMode] = useState("environment");
  const navigate = useNavigate();

  const handleValidate = async (id) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      console.log(" Sending to backend:", id);
      const data = await validateGuest(id);
      setResult(data);
      if (data.ok) {
        triggerConfetti();
        setResult({ status: "success", guest: data.guest });
      } else {
        setResult({ status: "duplicate", guest: data.guest });
      }
    } catch (err) {
      console.error(err);
      setError(" Guest not found or server error");
    } finally {
      setLoading(false);
    }
  };

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      try {
        const payload = JSON.parse(text);
        const uniqueId = payload.uniqueId; //  Extract uniqueId
        handleValidate(uniqueId); // Send only uniqueId
      } catch (err) {
        console.error("Invalid QR format:", err, text);
        setError("Invalid QR code");
      }
    },
    constraints: {
      video: { facingMode },
    },
    onError(error) {
      if (error.name === "NotAllowedError") {
        setCameraError(" Camera access denied. Please allow permissions.");
      } else if (error.name === "NotFoundError") {
        setCameraError(" No camera found on this device.");
      } else if (error.name === "NotReadableError") {
        setCameraError(" Camera is in use by another app.");
      } else {
        console.warn("Camera error:", error);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) handleValidate(manualId.trim());
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/admin/dashboard");
  };

  //  Confetti Animation
  const triggerConfetti = () => {
    const duration = 1 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#A52A2A", "#FFD700", "#FF6B6B"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#A52A2A", "#FFD700", "#FF6B6B"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // Fade-in effect for result card
  useEffect(() => {
    if (result) {
      const el = document.getElementById("result-card");
      if (el) {
        el.style.opacity = 0;
        setTimeout(() => {
          el.style.transition = "opacity 0.5s ease-in";
          el.style.opacity = 1;
        }, 50);
      }
    }
  }, [result]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      {/* Header Section */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="bg-[#A52A2A] text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow hover:bg-[#8B1A1A] transition"
        >
          ← Back
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#A52A2A] mb-4 text-center">
          Guest Verification
        </h2>

        <p className="text-gray-600 mb-3 text-center">
          Scan guest QR code or enter the unique ID manually.
        </p>

        {/* Camera View */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mb-4 aspect-square">
          {cameraError ? (
            <div className="p-4 text-red-500 text-sm text-center h-full flex items-center justify-center">
              {cameraError}
            </div>
          ) : (
            <video ref={ref} className="w-full h-full object-cover" />
          )}

          {/* Camera toggle */}
          <button
            onClick={toggleCamera}
            className="absolute bottom-2 right-2 bg-[#A52A2A] text-white px-3 py-1 text-sm rounded-lg shadow hover:bg-[#8B1A1A] transition"
          >
            Switch
          </button>
        </div>

        {/* Manual Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="I&A/2025/Table-01/john-001"
            className="border rounded-lg p-2 flex-1 text-gray-500 text-sm sm:text-base focus:ring-2 focus:ring-[#A52A2A]"
          />
          <button
            type="submit"
            className="bg-[#A52A2A] text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-sm sm:text-base"
          >
            Verify
          </button>
        </form>

        {/* Status Messages */}
        {loading && (
          <p className="mt-4 text-gray-500 text-center animate-pulse">
            Validating...
          </p>
        )}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {result && (
          <div
            id="result-card"
            className={`mt-6 p-4 rounded-xl shadow-md text-white text-center transition-all ${
              result.status === "success"
                ? "bg-green-600"
                : result.status === "duplicate"
                ? "bg-yellow-500"
                : "bg-red-600"
            }`}
          >
            <h3 className="text-lg font-semibold">
              {result.status === "success"
                ? "✅ Guest Validated"
                : result.status === "duplicate"
                ? "⚠️ Already Checked In"
                : "❌ Invalid Guest"}
            </h3>

            {result.guest && (
              <div className="mt-2 text-sm sm:text-base">
                <p>
                  <strong>Name:</strong>{" "}
                  {`${result.guest.firstName} ${result.guest.lastName}`}
                </p>
                <p>
                  <strong>Table:</strong> {result.guest.tableNo || "—"}
                </p>
                <p>
                  <strong>RSVP:</strong> {result.guest.rsvpStatus || "—"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
