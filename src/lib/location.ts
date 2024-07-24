import axios from "axios";

export async function getLocation(lat: string, lon: string) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  try {
    const response = await axios.get(url);
    console.log(response);
    const location = response.data.display_name;
    return location ? location : "Lokasi tidak ditemukan";
  } catch (error) {
    console.error("Error fetching location data:", error);
    return "Location not found";
  }
}
