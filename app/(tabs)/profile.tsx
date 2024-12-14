import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderModal } from '@/components/Profile/HeaderModal';
import { useWeather } from '@/hooks/profile/HeaderModal/useWeather';
import useProfile from '@/hooks/profile/HeaderModal/useProfile';
import { User } from '@/types/api.types';
import { BodyModal } from '@/components/Profile/BodyModal/TabBar';
import { LocationType } from '@/types/api.types'; // Ajoutez cette import

export default function ProfileScreen() {
  const [variant, setVariant] = useState<'private' | 'public'>('private');
  const { weatherData } = useWeather();
  const { user } = useProfile(1);
  const [location, setLocation] = useState("Votre localisation");

  const handleLocationSelect = (newLocation: LocationType) => {
    setLocation(newLocation.display_name);
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadSavedLocation = async () => {
        try {
          const savedLocation = await AsyncStorage.getItem('selectedLocation');
          if (savedLocation) {
            const locationData = JSON.parse(savedLocation);
            setLocation(locationData.display_name);
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la localisation:', error);
        }
      };
      loadSavedLocation();
    }, [])
  );

  const handleToggleVariant = () => {
    setVariant(prev => prev === 'private' ? 'public' : 'private');
  };

  const defaultUser: Partial<User> = {
    username: 'Anonymous',
    bio: 'No Bio',
    profileImage: require('@/assets/images/avatar.png'),
    followers: [], 
    followings: [], 
  };

  const userData = user || defaultUser;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderModal
          variant={variant}
          user={userData as User}
          location={location}
          onLocationSelect={handleLocationSelect}
          weather={weatherData ?? undefined}
          onToggleVariant={handleToggleVariant}
          onCalendarPress={() => console.log('Calendar pressed')}
          onSettingsPress={() => console.log('Settings pressed')}
          onNotificationPress={() => console.log('Notification pressed')}
          onBookmarkPress={() => console.log('Bookmark pressed')}
          followersCount={userData.followers?.length || 0}
          followingsCount={userData.followings?.length || 0}
        />
        <BodyModal variant={variant} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
  },
});