import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationType } from '@/types/api.types';
import { weatherService } from '@/services/utils/weatherServices';
import { WeatherInfo } from '@/components/Profile/HeaderModal/types';

const formatDayName = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '') + ' ';
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { 
    day: 'numeric',
    month: 'short' 
  }).replace('.', '');
};

export const useLocationWeather = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStoredLocation = useCallback(async () => {
    try {
      const savedLocation = await AsyncStorage.getItem('selectedLocation');
      console.log('Loading stored location:', savedLocation);
      if (savedLocation) {
        const parsedLocation = JSON.parse(savedLocation);
        setLocation(parsedLocation);
      }
    } catch (error) {
      console.error('Error loading location:', error);
    }
  }, []);

  const fetchWeatherData = useCallback(async () => {
    if (!location) {
      console.log('No location available for weather fetch');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching weather for location:', location);
      const forecast = await weatherService.fetchWeatherByLocation(location);
      
      if (forecast && forecast.length > 0) {
        const weatherInfo: WeatherInfo = {
          currentDate: formatDate(forecast[0].date),
          forecast: forecast.map(day => ({
            dayName: formatDayName(day.date),
            date: formatDate(day.date),
            temp: Math.round(day.temp_max),
            minTemp: Math.round(day.temp_min)
          }))
        };

        console.log('Setting new weather data:', weatherInfo);
        setWeather(weatherInfo);
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Impossible de récupérer les données météo');
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  // Charger la localisation au démarrage
  useEffect(() => {
    loadStoredLocation();
  }, []);

  // Mettre à jour la météo quand la localisation change
  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const updateLocation = useCallback(async (newLocation: LocationType) => {
    console.log('Updating location:', newLocation);
    try {
      await AsyncStorage.setItem('selectedLocation', JSON.stringify(newLocation));
      setLocation(newLocation);
      return true;
    } catch (error) {
      console.error('Error updating location:', error);
      return false;
    }
  }, []);

  return { 
    location, 
    weather, 
    isLoading, 
    error, 
    updateLocation,
    refreshWeather: fetchWeatherData 
  };
};