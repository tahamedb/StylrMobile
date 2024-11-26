import { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { WeatherInfo } from '@/components/Profile/HeaderModal/types';

export const useWeatherScroll = (weather?: WeatherInfo) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!weather) return;

    const todayIndex = weather.forecast.findIndex(
      (day) => day.date === weather.currentDate
    ) || 0;

    const scrollPosition = todayIndex * 340;

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: scrollPosition,
        animated: false
      });
    }, 100);
  }, [weather]);

  return scrollViewRef;
};