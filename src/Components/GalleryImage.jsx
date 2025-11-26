import { useInView } from "react-intersection-observer";

export default function GalleryImage({
  img,
  optimizedUrl,
  onClick,
  onLike,
  liked,
  likes,
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative mb-4 break-inside-avoid group transition-all duration-700 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      {/* Image — opens Lightbox */}
      <img
        src={optimizedUrl}
        alt={img.uploader || "Guest photo"}
        loading="lazy"
        className="w-full rounded-xl shadow-md hover:scale-[1.02] transition duration-300 cursor-pointer"
        onClick={onClick}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition p-3 flex flex-col justify-end">
        <p className="text-white font-medium mb-2 truncate">
          {img.uploader || "Anonymous"}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onLike}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md transition
              ${
                liked
                  ? "bg-[#9CAF88] text-white cursor-default"
                  : "bg-[#9CAF88] text-white hover:bg-gray-800"
              }`}
          >
            ❤️ {likes}
          </button>

          <a
            href={optimizedUrl}
            download
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-800 text-white hover:bg-[#9CAF88] rounded-md transition"
          >
            ⬇ Download
          </a>
        </div>
      </div>
    </div>
  );
}
