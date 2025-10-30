// frontend/src/api/hotelApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/hotels";

export async function searchHotels(city) {
  const res = await axios.get("http://localhost:5000/api/hotels/search", {
    params: { city },
  });
  console.log("🔍 Backend response:", res.data);
  return res.data;
}

export async function getHotelDetails(hotel_id) {
  const { data } = await axios.get(`${BASE_URL}/details/${hotel_id}`);
  return data;
}
