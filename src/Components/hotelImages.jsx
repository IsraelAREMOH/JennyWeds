import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HotelImages = ({ hotel, setHoveredInfo }) => {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      loop
      nested={true} //critical for nested sliders
      grabCursor={true}
      className="hotel-image-swiper rounded-lg overflow-hidden"
    >
      {hotel.images.map((imgSrc, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={imgSrc}
            alt={`${hotel.name} image ${idx + 1}`}
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded"
            onMouseEnter={() =>
              setHoveredInfo({
                position: { lat: hotel.lat, lng: hotel.lng },
                content: (
                  <img
                    src={imgSrc}
                    alt="Hovered"
                    className="w-32 sm:w-48 h-auto"
                  />
                ),
              })
            }
            onMouseLeave={() => setHoveredInfo(null)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HotelImages;
