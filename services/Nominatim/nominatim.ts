const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

export const nominatimService = {
  search: async (query: string): Promise<Location[]> => {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=fr`,
      {
        headers: {
          'User-Agent': 'Stylr'
        }
      }
    );
    return response.json();
  },

  reverseGeocode: async (lat: number, lon: number): Promise<Location> => {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=fr`,
      {
        headers: {
          'User-Agent': 'Stylr'
        }
      }
    );
    return response.json();
  }
};