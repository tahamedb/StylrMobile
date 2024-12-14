import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            height: 60,
            borderTopWidth: 0,
            backgroundColor: isDark ? '#000' : '#fff',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          },
          default: {
            height: 60,
            backgroundColor: isDark ? '#000' : '#fff',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name="account-outline" 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="createPost"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name="grid" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wardrobe"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name="home-variant" 
              size={28} 
              color={Colors[colorScheme ?? 'light'].tint} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name="upload-outline" 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="homeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name="home-outline" 
              size={26} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name="cog-outline" 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
        }}

      />
    </Tabs>
  );
}
