import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploader, setUploader] = useState("");
  const [localPreview, setLocalPreview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);

  // Auto focus name field when opened
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  // Revoke preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  // Reset everything when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setUploader("");
      setUploadedUrl("");
      setMessage("");
      setLocalPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return "";
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Instantly revoke old preview
    if (localPreview) URL.revokeObjectURL(localPreview);

    setFile(selected);
    setLocalPreview(URL.createObjectURL(selected));
    setUploadedUrl("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submission

    if (!file || !uploader.trim()) {
      setMessage("Please fill in your name and select a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("uploader", uploader.trim());

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload-photo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30_000, // 30s timeout for slow Nigerian networks
        }
      );

      setMessage("Upload successful! 🎉");
      setUploadedUrl(res.data.url);
      onUploadSuccess?.(res.data.url);

      // Reset form
      setFile(null);
      setUploader("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (localPreview) URL.revokeObjectURL(localPreview);
      setLocalPreview("");
    } catch (err) {
      console.error("Upload error:", err);

      const errorMsg =
        err.response?.data?.message || err.message === "Network Error"
          ? "No internet connection. Please check your network and try again."
          : "Upload failed. Please try again.";

      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 px-4 py-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
        <button
          onClick={onClose}
          aria-label="Close upload modal"
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 transition"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-[#6F4E37] mb-6">
          Upload Your Favorite Moment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="uploader"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Name
            </label>
            <input
              id="uploader"
              ref={nameInputRef}
              type="text"
              value={uploader}
              onChange={(e) => setUploader(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent transition"
              placeholder="e.g. Chioma & Ifeanyi"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Choose Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full text-sm file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-[#6F4E37] file:text-white hover:file:bg-[#8B0000] cursor-pointer"
              required
            />
          </div>

          {/* Local Preview */}
          {localPreview && (
            <div className="rounded-lg overflow-hidden shadow-lg">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={localPreview}
                alt="Preview"
                className="w-full max-h-80 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Success State */}
          {uploadedUrl && !localPreview && (
            <div className="text-center py-4 animate-fadeIn">
              <p className="text-green-600 font-bold text-lg mb-3">
                Uploaded Successfully! 🎊
              </p>
              <img
                src={uploadedUrl}
                alt="Uploaded"
                className="w-full max-h-80 object-cover rounded-lg shadow-xl"
              />
              <p className="text-sm text-gray-600 mt-4">
                Share with friends:{" "}
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6F4E37] font-semibold underline"
                >
                  View Full Size
                </a>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file || !uploader.trim()}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
              loading || !file || !uploader.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#6F4E37] hover:bg-[#8B0000] text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Uploading... ⏳" : "Upload Photo"}
          </button>
        </form>

        {/* Message Feedback */}
        {message && (
          <p
            className={`text-center mt-6 text-lg font-semibold animate-pulse ${
              message.includes("successful") || message.includes("Uploaded")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
