import React, { useState } from 'react';
import { View, StyleSheet , SafeAreaView } from 'react-native';
import { HeaderModal } from '@/components/Profile/HeaderModal';
import { useWeather } from '@/hooks/profile/HeaderModal/useWeather';
import useProfile from '@/hooks/profile/HeaderModal/useProfile';
import { User } from '@/types/api.types';
import { BodyModal } from '@/components/Profile/BodyModal';

export default function ProfileScreen() {
  const [variant, setVariant] = useState<'private' | 'public'>('private');
  const { weatherData } = useWeather();
  const { user } = useProfile(1);

  const handleToggleVariant = () => {
    setVariant(prev => prev === 'private' ? 'public' : 'private');
  };

  const defaultUser: Partial<User> = {
    username: 'Anonymous',
    bio: 'No Bio',
    profileImage: require('@/assets/images/avatar.png'),
  };

  const userData = user || defaultUser;

 

  return (
    <SafeAreaView style={styles.safeArea}>
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
