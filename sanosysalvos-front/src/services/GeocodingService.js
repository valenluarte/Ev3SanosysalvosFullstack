import axios from "axios";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";

export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(`${NOMINATIM_URL}/search`, {
      params: {
        q: address,
        format: "json",
        limit: 5,
        addressdetails: 1
      },
      headers: {
        "User-Agent": "SanosYSalvos/1.0"
      }
    });

    if (response.data && response.data.length > 0) {
      return response.data.map(item => ({
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        displayName: item.display_name,
        address: item.address
      }));
    }
    return [];
  } catch (error) {
    console.error("Error al geocodificar:", error);
    return [];
  }
};

export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(`${NOMINATIM_URL}/reverse`, {
      params: {
        lat: lat,
        lon: lon,
        format: "json"
      },
      headers: {
        "User-Agent": "SanosYSalvos/1.0"
      }
    });

    if (response.data) {
      return response.data.display_name || "Dirección no encontrada";
    }
    return "Dirección no encontrada";
  } catch (error) {
    console.error("Error al hacer reverse geocode:", error);
    return "Error al obtener dirección";
  }
};