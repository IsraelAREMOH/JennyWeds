import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { APIProvider } from "@vis.gl/react-google-maps";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HotelMap from "../Components/hotelMap";
import HotelSlide from "../Components/hotelSlides";
import { HOTELS } from "../Components/hotelData";
import HotelCards from "../Components/hotelCards";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const HotelMapCard = () => {
  const [center, setCenter] = useState({ lat: 6.335, lng: 5.62 });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const activeHotel = HOTELS[swiper.activeIndex];
    setCenter({ lat: activeHotel.lat, lng: activeHotel.lng });
  };

  const handleMarkerClick = (hotel) => {
    setSelectedHotel(hotel);
    const index = HOTELS.findIndex((h) => h.id === hotel.id);
    if (swiperRef.current) swiperRef.current.slideTo(index);
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        {/* 🔹 Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-600 mb-3">
            Explore Our Recommended Hotels
          </h3>
          <p className="text-gray-500 text-base md:text-lg">
            Discover the best hotels near the venue — curated for comfort,
            convenience, and unforgettable experiences.
          </p>
        </div>

        {/* 🔹 Map + Slider Section */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* 🏨 Slider (Top on Mobile, Right on Desktop) */}
          <div className="order-1 md:order-2 w-full md:w-1/2 relative z-10">
            <div className="p-4 sm:p-6">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop
                spaceBetween={20}
                slidesPerView={1}
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="w-full !h-auto"
                style={{ paddingBottom: "2.5rem" }} // add spacing for pagination bullets
              >
                {HOTELS.map((hotel) => (
                  <SwiperSlide key={hotel.id} className="!h-auto">
                    <HotelSlide hotel={hotel} setHoveredInfo={setHoveredInfo} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* 🗺️ Map (Bottom on Mobile, Left on Desktop) */}
          <div className="order-2 md:order-1 w-full md:w-1/2 h-[300px] sm:h-[350px] md:h-[450px]">
            <HotelMap
              center={center}
              hotels={HOTELS}
              selectedHotel={selectedHotel}
              setSelectedHotel={setSelectedHotel}
              hoveredInfo={hoveredInfo}
              setHoveredInfo={setHoveredInfo}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>

        {/* 🔹 Hotel Cards Section */}
        <div className="max-w-6xl mt-16 mx-auto px-2 sm:px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">
            More Places to Stay
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Choose from a selection of hotels that offer great comfort and
            proximity to the event location.
          </p>
          <HotelCards />
        </div>
      </div>
    </APIProvider>
  );
};

export default HotelMapCard;
