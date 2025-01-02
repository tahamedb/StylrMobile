import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { authService } from '@/services/auth/authService';

export function useProtectedRoute() {
  const { user, isLoading, setUser } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []); // Check auth on mount

  const checkAuth = async () => {
    try {
      // Check if we have a stored token
      const token = await authService.getToken();
      if (token) {
        // Get the stored user data
        const storedUser = await authService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // If there's an error, clear the stored data
      await authService.logout();
    }
  };

  useEffect(() => {
    if (!isLoading) {
      // Check if user is not on auth screen
      const inAuthGroup = segments[0] === 'auth';
      
      if (!user && !inAuthGroup) {
        // Redirect to auth if no user and not already on auth screen
        router.replace('/auth');
      } else if (user && inAuthGroup) {
        // Redirect to home if user is authenticated but still on auth screen
        router.replace('/(tabs)');
      }
    }
  }, [user, segments, isLoading]);

  return null;
} 