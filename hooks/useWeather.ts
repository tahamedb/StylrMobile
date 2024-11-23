// hooks/useWeather.ts
import { useState, useEffect } from 'react';
import { WeatherInfo } from '@/components/Profile/HeaderModal/types';

const getCurrentDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  }).replace('.', '');
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    generateWeatherData();
  }, []);

  const generateWeatherData = () => {
    const today = new Date();
    const forecast = [];
    
    for (let i = -2; i <= 2; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      forecast.push({
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '') + ' ',
        date: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).replace('.', ''),
        temp: Math.floor(Math.random() * (25 - 15) + 15),
        minTemp: Math.floor(Math.random() * (15 - 8) + 8)
      });
    }

    setWeatherData({
      currentDate: getCurrentDate(),
      forecast: forecast
    });
  };

  return { weatherData };
};