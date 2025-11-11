// src/components/uploadModal.jsx
import { useState } from "react";
import axios from "axios";

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploader, setUploader] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
    if (!uploader.trim()) {
      alert("Please enter your name before uploading.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", file); // important: should match backend multer.single("photo")
      formData.append("uploader", uploader.trim());

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload-photo`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data?.success) {
        const uploadedImage = {
          public_id: res.data.public_id,
          url: res.data.url,
          uploader: res.data.uploader,
          likes: 0,
        };

        // ✅ Add new image to gallery instantly
        onUploadSuccess(uploadedImage);

        // ✅ Reset all states
        setFile(null);
        setUploader("");
        setPreview("");

        // ✅ Close modal automatically
        onClose();
      } else {
        alert(res.data?.message || "Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-[#6F4E37] mb-4 text-center">
          Upload a Photo
        </h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          className="w-full border text-gray-500 border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
        />

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-3"
        />

        {/* Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full text-gray-500 h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-5 py-2 bg-[#6F4E37] text-white rounded-lg hover:bg-[#8B0000] transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
