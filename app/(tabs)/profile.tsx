import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderModal } from '@/components/Profile/HeaderModal';
import { WeatherInfo } from '@/components/Profile/HeaderModal/types'; 
import { useWeather } from '@/hooks/useWeather';


export default function ProfileScreen () {
  const [variant, setVariant] = useState<'private' | 'public'>('private');
  const { weatherData } = useWeather();


  const handleToggleVariant = () => {
    setVariant(prev => prev === 'private' ? 'public' : 'private');
  };

  return (
    <View style={styles.container}>
      <HeaderModal
        variant={variant}
        username="Dina Hsisou"
        location="Ouarzazat"
        weather={weatherData ?? undefined}
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


