import { LocationType, ForecastDay, WeatherResponse } from "@/types/api.types";
import Constants from 'expo-constants';

// Debugging environment variables
const API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey || process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
const BASE_URL = Constants.expoConfig?.extra?.openWeatherApiUrl || process.env.EXPO_PUBLIC_OPEN_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5/forecast';

console.log('Weather Service Configuration:', {
  API_KEY: API_KEY ? 'Present' : 'Missing',
  BASE_URL,
  fullEnv: process.env,
  expoConfig: Constants.expoConfig?.extra
});

export const weatherService = {
  fetchWeatherByLocation: async (location: LocationType): Promise<ForecastDay[]> => {
    if (!API_KEY) {
      throw new Error('API key is not configured. Please check your environment setup.');
    }

    try {
      const params = new URLSearchParams({
        lat: String(location.lat),
        lon: String(location.lon),
        appid: API_KEY,
        units: 'metric',
      }).toString();

      const url = `${BASE_URL}?${params}`;
      console.log('Fetching weather from URL:', url.replace(API_KEY, 'HIDDEN_KEY'));

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Weather API Error Response:', errorData);
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data: WeatherResponse = await response.json();
      console.log('Weather API Response:', data);
      
      if (!data.list) {
        throw new Error('Invalid response format from weather API');
      }

      const dailyForecasts = data.list.reduce((acc: Record<string, ForecastDay>, curr) => {
        const date = curr.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = {
            date,
            temp_min: curr.main.temp_min,
            temp_max: curr.main.temp_max,
          };
        } else {
          acc[date].temp_min = Math.min(acc[date].temp_min, curr.main.temp_min);
          acc[date].temp_max = Math.max(acc[date].temp_max, curr.main.temp_max);
        }
        return acc;
      }, {});

      return Object.values(dailyForecasts).slice(0, 5);
    } catch (error) {
      console.error('Error in weather service:', error);
      throw error;
    }
  }
};