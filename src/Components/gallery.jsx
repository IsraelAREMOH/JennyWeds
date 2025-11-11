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
    const storedLikes = JSON.parse(localStorage.getItem("likedImages") || "{}");
    setLikedImages(storedLikes);
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/gallery`);
      setImages(res.data.images || []);
      setLikes(
        res.data.images.reduce((acc, img) => {
          acc[img.public_id] = img.likes || 0;
          return acc;
        }, {})
      );
    } catch (err) {
      setError(
        "Failed to load photos. Check your connection and try again.",
        err
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLike = async (public_id, uploader) => {
    if (likedImages[public_id]) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/gallery/like`,
        { public_id, uploader }
      );

      setLikes((prev) => ({
        ...prev,
        [public_id]: res.data.likes,
      }));

      const updatedLiked = { ...likedImages, [public_id]: true };
      setLikedImages(updatedLiked);
      localStorage.setItem("likedImages", JSON.stringify(updatedLiked));
    } catch (err) {
      console.error("Failed to like image:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-gray-50 z-10 border-b px-4 sm:px-6 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#6F4E37]">
            Our Wedding Gallery
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#6F4E37] hover:bg-[#8B0000] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base"
          >
            Upload Photo
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-xl aspect-square animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-10 sm:py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchImages}
              className="bg-[#6F4E37] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#8B0000] transition text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && images.length === 0 && (
          <div className="text-center py-10 sm:py-20 text-gray-500 text-sm sm:text-base">
            No photos yet. Be the first to upload!
          </div>
        )}

        {/* Gallery Masonry */}
        {!loading && !error && images.length > 0 && (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
            {images.map((img) => {
              const optimizedUrl = img.url
                .replace("/upload/", "/upload/q_auto:eco,f_auto,w_800/")
                .replace("http://", "https://");

              return (
                <div
                  key={img.public_id}
                  className="relative mb-4 break-inside-avoid group"
                >
                  {/* Image */}
                  <img
                    src={optimizedUrl}
                    alt={`Photo by ${img.uploader}`}
                    loading="lazy"
                    className="w-full rounded-xl shadow-lg hover:scale-[1.02] transition duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                    {/* Uploader Name */}
                    <p className="text-white font-medium mb-2 truncate text-sm sm:text-base">
                      {img.uploader}
                    </p>

                    {/* Like and Download inline */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(img.public_id, img.uploader)}
                        className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base transition rounded ${
                          likedImages[img.public_id]
                            ? "bg-[#9CAF88] text-white cursor-default"
                            : "bg-[#9CAF88] text-white hover:bg-red-700"
                        }`}
                      >
                        ❤️ {likes[img.public_id] || 0}
                      </button>
                      <a
                        href={optimizedUrl}
                        download
                        className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base bg-gray-800 text-white hover:bg-gray-900 transition rounded"
                      >
                        ⬇
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={() => {
          setIsModalOpen(false);
          fetchImages();
        }}
      />
    </div>
  );
}
