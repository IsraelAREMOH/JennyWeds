import HotelImages from "../Components/hotelImages";

const HotelSlide = ({ hotel, setHoveredInfo }) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl flex flex-col justify-between h-full shadow-md">
      {/*  Image Carousel */}
      <div className="relative mb-3 sm:mb-4">
        <HotelImages hotel={hotel} setHoveredInfo={setHoveredInfo} />
      </div>

      {/*  Hotel Info */}
      <div className="flex flex-col justify-between flex-grow text-center sm:text-left">
        <div>
          <h2 className="text-base sm:text-xl font-semibold text-gray-800 leading-tight">
            {hotel.name}
          </h2>
          <div className="flex justify-center sm:justify-start items-center text-xs sm:text-sm text-gray-600 mt-1 space-x-1">
            <span className="text-gray-700">{hotel.rating}</span>
            <span>• {hotel.distance}</span>
            <span>• {hotel.time}</span>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2">
          <p className="text-xs sm:text-sm text-gray-600">
            Book before <span className="font-medium">{hotel.bookBefore}</span>
          </p>
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm text-[#6F4E37]">Group Rate</p>
            <p className="text-lg sm:text-2xl font-bold">
              ${hotel.rate} /night
            </p>
          </div>
        </div>

        <a
          href="https://www.booking.com"
          target="_blank" // opens in a new tab
          rel="noopener noreferrer" // security best practice
        >
          <button className="mt-3 bg-black text-white py-2 px-5 rounded-full text-sm hover:bg-gray-800 transition w-full sm:w-auto">
            See Availability
          </button>
        </a>
      </div>
    </div>
  );
};

export default HotelSlide;
