import { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { User } from '@/types/api.types';
import { userService } from '@/services/user/userService';
import { HeaderModal } from '@/components/Profile/HeaderModal';
import { BodyModal } from '@/components/Profile/BodyModal/TabBar';
import { ThemedText } from '@/components/ThemedText';

export default function PublicProfileScreen() {
  const params = useLocalSearchParams();
  const id = params.id;
  console.log('Received params:', params);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    loadUserProfile();
  }, [id]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching user with ID:', id);
      const userData = await userService.getUserById(Number(id));
      console.log('Fetched user data:', userData);
      setUser(userData);
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: user?.username || 'Profile',
          presentation: 'modal'
        }} 
      />
      
      <SafeAreaView style={styles.safeArea}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <ThemedText>Loading profile...</ThemedText>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>
              {error}
            </ThemedText>
          </View>
        ) : user ? (
          <View style={styles.container}>
            <HeaderModal
              variant="public"
              user={user}
              location=""
              weather={undefined}
              followersCount={user.followers?.length || 0}
              followingsCount={user.followings?.length || 0}
              onToggleVariant={() => {}}
              onCalendarPress={() => {}}
              onSettingsPress={() => {}}
              onNotificationPress={() => {}}
              onBookmarkPress={() => {}}
            />
            <BodyModal variant="public" />
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
}); 