import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import { HeaderModalProps } from './types';
import { TopBar } from './componentsProfile/TopBar';
import { UserInfo } from './componentsProfile/UserInfo';
import { WeatherSection } from './componentsProfile/WeatherSection';
import { PublicProfileContent } from './componentsProfile/PublicProfileContent';
import { useLocationWeather } from '@/hooks/profile/HeaderModal/useLocationWeather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HeaderModal: React.FC<Omit<HeaderModalProps, 'weather' | 'location' | 'onLocationSelect'>> = ({
  variant,
  user,
  onToggleVariant,
  onCalendarPress,
  onSettingsPress,
  onNotificationPress,
  onBookmarkPress,
}) => {
  const { 
    location, 
    weather, 
    isLoading,
    updateLocation,
  } = useLocationWeather();

  useFocusEffect(
    React.useCallback(() => {
      const checkForLocationUpdates = async () => {
        try {
          const savedLocation = await AsyncStorage.getItem('selectedLocation');
          if (savedLocation) {
            const parsedLocation = JSON.parse(savedLocation);
            if (!location || parsedLocation.place_id !== location.place_id) {
              console.log('New location detected, updating...', parsedLocation);
              await updateLocation(parsedLocation);
            }
          }
        } catch (error) {
          console.error('Error checking location updates:', error);
        }
      };

      checkForLocationUpdates();
    }, [])
  );

  const isPrivate = variant === 'private';

  return (
    <View style={styles.container}>
      <TopBar 
        isPrivate={isPrivate}
        onToggleVariant={onToggleVariant}
        onNotificationPress={onNotificationPress}
        onBookmarkPress={onBookmarkPress}
      />
      
      <UserInfo 
        user={user}
        isPrivate={isPrivate}
        onToggleVariant={onToggleVariant}
      />

      {isPrivate && (
        isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : weather ? (
          <WeatherSection 
            weather={weather}
            location={location?.display_name || ''}
            variant={variant}
            onCalendarPress={onCalendarPress}
            onLocationSelect={updateLocation}
          />
        ) : null
      )}

      {!isPrivate && (
        <PublicProfileContent 
          user={user}
          followersCount={user.followers.length}
          followingsCount={user.followings.length}
          onSettingsPress={onSettingsPress}
        />
      )}
    </View>
  );
};