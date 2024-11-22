import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderModal } from '@/components/Profile/HeaderModal';
import { WeatherInfo } from '@/components/Profile/HeaderModal/types'; 

const getCurrentDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  }).replace('.', '');
};

const generateWeatherDates = () => {
  const today = new Date();
  const forecast = [];
  
  for (let i = -2; i <= 2; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    forecast.push({
      dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')+ ' ',
      date: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).replace('.', ''),
      temp: Math.floor(Math.random() * (25 - 15) + 15),
      minTemp: Math.floor(Math.random() * (15 - 8) + 8)
    });
  }

  return {
    currentDate: getCurrentDate(),
    forecast: forecast
  };
};

export default function ProfileScreen () {
  const [variant, setVariant] = useState<'private' | 'public'>('private');
  const weatherData = generateWeatherDates();


  const handleToggleVariant = () => {
    setVariant(prev => prev === 'private' ? 'public' : 'private');
  };

  return (
    <View style={styles.container}>
      <HeaderModal
        variant={variant}
        username="Dina Hsisou"
        location="Ouarzazat"
        weather={weatherData}
        onToggleVariant={handleToggleVariant}
        onCalendarPress={() => console.log('Calendar pressed')}
        onSettingsPress={() => console.log('Settings pressed')}
        onNotificationPress={() => console.log('Notification pressed')}
        onBookmarkPress={() => console.log('Bookmark pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});


