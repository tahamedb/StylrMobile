import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { HeaderModal } from '@/components/Profile/HeaderModal';
import { useWeather } from '@/hooks/profile/HeaderModal/useWeather';
import { User } from '@/types/api.types';
import { BodyModal } from '@/components/Profile/BodyModal/TabBar';
import { userService } from '@/services/user/userService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  const [variant, setVariant] = useState<'private' | 'public'>('private');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { weatherData } = useWeather();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVariant = () => {
    setVariant(prev => prev === 'private' ? 'public' : 'private');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <ThemedText>Loading profile...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <HeaderModal
        variant={variant}
        user={user}
        location="Ouarzazat"
        weather={weatherData ?? undefined}
        onToggleVariant={handleToggleVariant}
        onCalendarPress={() => console.log('Calendar pressed')}
        onSettingsPress={() => console.log('Settings pressed')}
        onNotificationPress={() => console.log('Notification pressed')}
        onBookmarkPress={() => console.log('Bookmark pressed')}
        followersCount={user.followers?.length || 0}
        followingsCount={user.followings?.length || 0}
      />
      <BodyModal variant={variant} />
    </ThemedView>
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
