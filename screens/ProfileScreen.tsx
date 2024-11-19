import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderModal } from '../components/Profile/HeaderModal';
import { WeatherInfo } from '../components/Profile/HeaderModal/types';  // Assurez-vous que le type WeatherInfo est importé correctement
import { HeaderModalProps } from '../components/Profile/HeaderModal/types';

export const ProfileScreen: React.FC = () => {
  const [variant, setVariant] = useState<'private' | 'public'>('private');

  // Définition des données météo
  const weatherData: WeatherInfo = {
    currentTemp: 20,
    minTemp: 11,
    date: "18 nov.",
    nextTemp: 20,
    nextMinTemp: 14,
    nextDate: "19 nov."
  };

  const handleToggleVariant = () => {
    setVariant(prev => prev === 'private' ? 'public' : 'private');
  };

  return (
    <View style={styles.container}>
      <HeaderModal
        variant={variant}
        username="dinahs"
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


