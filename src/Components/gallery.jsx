// src/components/GalleryPage.jsx
import { useState, useEffect, useCallback } from "react";
import UploadModal from "./uploadModal";
import axios from "axios";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState({});
  const [likedImages, setLikedImages] = useState({});

  // Load liked images from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedImages") || "{}");
    setLikedImages(stored);
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/gallery`);
      const imgs = res.data.images || [];

      setImages(imgs);
      setLikes(
        imgs.reduce((acc, img) => {
          acc[img.public_id] = img.likes || 0;
          return acc;
        }, {})
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load photos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Like button handler (instant update)
  const handleLike = async (public_id, uploader) => {
    if (likedImages[public_id]) return;

    // Optimistically update UI
    setLikes((prev) => ({ ...prev, [public_id]: (prev[public_id] || 0) + 1 }));
    const updatedLiked = { ...likedImages, [public_id]: true };
    setLikedImages(updatedLiked);
    localStorage.setItem("likedImages", JSON.stringify(updatedLiked));

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/gallery/like`, {
        public_id,
        uploader: uploader || "Anonymous",
      });
    } catch (err) {
      console.error("Failed to like image:", err);
      // Rollback if error
      setLikes((prev) => ({ ...prev, [public_id]: prev[public_id] - 1 }));
      const rollbackLiked = { ...updatedLiked };
      delete rollbackLiked[public_id];
      setLikedImages(rollbackLiked);
      localStorage.setItem("likedImages", JSON.stringify(rollbackLiked));
    }
  };

  // Handle successful upload
  const handleUploadSuccess = (newImage) => {
    if (!newImage?.url) return;
    setImages((prev) => [newImage, ...prev]);
    setLikes((prev) => ({ ...prev, [newImage.public_id]: 0 }));
    setIsModalOpen(false); // ✅ Close modal automatically
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-gray-50 z-10 border-b px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-3xl font-bold text-[#6F4E37] text-center sm:text-left">
          Our Wedding Gallery
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6F4E37] text-white px-5 py-3 rounded-lg hover:bg-[#8B0000] transition"
        >
          Upload Photo
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-xl aspect-square animate-pulse"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-600 mt-10">{error}</p>
        )}

        {!loading && !error && images.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No photos yet. Be the first to upload!
          </p>
        )}

        {!loading && !error && images.length > 0 && (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
            {images.map((img) => {
              const optimizedUrl = img.url?.includes("/upload/")
                ? img.url.replace(
                    "/upload/",
                    "/upload/q_auto:eco,f_auto,w_800/"
                  )
                : img.url;

              return (
                <div
                  key={img.public_id}
                  className="relative mb-4 break-inside-avoid group"
                >
                  <img
                    src={optimizedUrl}
                    alt={`Photo by ${img.uploader || "Anonymous"}`}
                    loading="lazy"
                    className="w-full rounded-xl shadow-lg hover:scale-[1.02] transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                    <p className="text-white font-medium mb-2 truncate">
                      {img.uploader || "Anonymous"}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleLike(img.public_id, img.uploader)}
                        className={`flex items-center gap-1 px-3 py-1 text-sm transition ${
                          likedImages[img.public_id]
                            ? "bg-[#9CAF88] text-white cursor-default"
                            : "bg-[#9CAF88] text-white hover:bg-gray-800"
                        }`}
                      >
                        ❤️ {likes[img.public_id] || 0}
                      </button>
                      <a
                        href={optimizedUrl}
                        download
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-800 text-white hover:bg-gray-900 transition"
                      >
                        ⬇ Download
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
