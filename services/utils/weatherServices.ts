import {ForecastDay, WeatherResponse} from "@/types/api.types";
import {apiClientWrapper} from "@/services/api/client";

const Weather_Api_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
export const fetchWeatherForecast = async (
    lat: number,
    lon: number
): Promise<ForecastDay[]> => {
    if (!API_KEY) {
        throw new Error('API key is not set. Please configure your environment variables.');
    }
    try {
        const params = new URLSearchParams({
            lat: lat.toString(),
            lon: lon.toString(),
            appid: API_KEY,
            units: 'metric', // Temperatures in Celsius
        }).toString();

        const data = await apiClientWrapper.get<WeatherResponse>(
            `${Weather_Api_URL}?${params}`
        );

        // Process the data to extract 4-day min/max forecast
        const dailyForecasts = data.list.reduce((acc: Record<string, ForecastDay>, curr) => {
            const date = curr.dt_txt.split(' ')[0]; // Get the date part
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

        return Object.values(dailyForecasts).slice(0, 4); // Return 4 days
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return [];
    }
};
