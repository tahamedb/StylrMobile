import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderModal } from '@/components/Profile/HeaderModal';
import { useWeather } from '@/hooks/profile/HeaderModal/useWeather';
import useProfile from '@/hooks/profile/HeaderModal/useProfile';
import { User } from '@/types/api.types';

export default function ProfileScreen() {
  const [variant, setVariant] = useState<'private' | 'public'>('private');
  const { weatherData } = useWeather();
  const { user } = useProfile(1); 

  const handleToggleVariant = () => {
    setVariant(prev => prev === 'private' ? 'public' : 'private');
  };

  const defaultUser: Partial<User> = {
    username: 'Chargement...',
    bio: 'Chargement...',
    profileImage: require('@/assets/images/avatar.png'),
  };

  const userData = user || defaultUser;

  return (
    <View style={styles.container}>
      <HeaderModal
        variant={variant}
        user={userData as User}
        location="Ouarzazat"
        weather={weatherData ?? undefined}
        onToggleVariant={handleToggleVariant}
        onCalendarPress={() => console.log('Calendar pressed')}
        onSettingsPress={() => console.log('Settings pressed')}
        onNotificationPress={() => console.log('Notification pressed')}
        onBookmarkPress={() => console.log('Bookmark pressed')}
        followersCount={userData.followers?.length || 0} 
        followingsCount={userData.followings?.length || 0} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});