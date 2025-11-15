import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HotelImage } from "../constants/index";

const HotelCards = () => {
  const hotels = [
    {
      id: 2,
      name: "Prenox Hotel And Suites",
      address: "24 Benin Road, Off Airport Road",
      distance: "2.6 mi",
      time: "9 min",
      rating: "★★★",
      bookBefore: "Nov 20, 2025",
      rate: 45,
      images: HotelImage.slice(0, 2).map((img) => img.src),
    },
    {
      id: 3,
      name: "Vertus Hotel & Suites",
      address: "28 Akhionbare Street, Benin City, Nigeria",
      distance: "2.6 mi",
      time: "13 min",
      rating: "★★★★",
      bookBefore: "Nov 22, 2025",
      rate: 77,
      images: HotelImage.slice(28, 30).map((img) => img.src),
    },
    {
      id: 4,
      name: "Ovic hotel",
      address: "65 Ihama Rd, Benin City, Nigeria",
      distance: "2.3 mi",
      time: "10 min",
      rating: "★★",
      bookBefore: "Nov 14, 2025",
      rate: 35,
      images: HotelImage.slice(27, 29).map((img) => img.src),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Responsive grid: 1 col on mobile, 2 on tablets, 3 on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={`${hotel.id}-${hotel.name}`}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-300"
          >
            {/* Image Carousel Section */}
            <div className="relative group">
              <Swiper
                modules={[Navigation]}
                navigation
                loop
                className="w-full h-48 sm:h-56 md:h-64 rounded-t-xl"
              >
                {hotel.images.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={src}
                      alt={`${hotel.name} image ${idx + 1}`}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Overlay Hotel ID (top-left) */}
              <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                {hotel.id}
              </span>
            </div>

            {/* Details Section */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 break-words">
                {hotel.name}
              </h3>

              <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1 gap-1">
                <span className="text-gray-700">{hotel.rating}</span>
                <span>
                  {hotel.distance} ⏱ {hotel.time}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap justify-between items-center gap-2">
                <p className="text-xs text-gray-500">
                  Book before {hotel.bookBefore}
                </p>
                <p className="text-sm text-teal-600">
                  Group Rate ⓒ ${hotel.rate}/night
                </p>
              </div>
            </div>

            {/* Button Section */}
            <div className="p-4 pt-0">
              <button className="w-full bg-gray-900 text-white py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600">
                Check it out online
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelCards;
