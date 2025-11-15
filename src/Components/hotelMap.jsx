import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const HotelMap = ({
  center,
  hotels,
  selectedHotel,
  setSelectedHotel,
  hoveredInfo,
  setHoveredInfo,
  onMarkerClick,
}) => {
  return (
    <Map
      mapId={"3b6d6fa8aa78e7cb98cae225"}
      center={center}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      {hotels.map((hotel) => (
        <AdvancedMarker
          key={hotel.id}
          position={{ lat: hotel.lat, lng: hotel.lng }}
          onClick={() => onMarkerClick(hotel)}
        >
          <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
        </AdvancedMarker>
      ))}

      {selectedHotel && (
        <InfoWindow
          position={{ lat: selectedHotel.lat, lng: selectedHotel.lng }}
          onCloseClick={() => setSelectedHotel(null)}
        >
          <div className="text-sm">
            <h3 className="font-bold">{selectedHotel.name}</h3>
            <p>{selectedHotel.address}</p>
          </div>
        </InfoWindow>
      )}

      {hoveredInfo && (
        <InfoWindow
          position={hoveredInfo.position}
          onCloseClick={() => setHoveredInfo(null)}
        >
          {hoveredInfo.content}
        </InfoWindow>
      )}
    </Map>
  );
};

export default HotelMap;
