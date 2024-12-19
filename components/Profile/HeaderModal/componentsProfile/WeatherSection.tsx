import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MapPinIcon, ChevronLeftIcon } from 'lucide-react-native';
import { WeatherCard } from './WeatherCard';
import { styles } from '../styles';
import { WeatherSectionProps } from '../types';
import { useWeatherScroll } from '@/hooks/profile/HeaderModal/useWeatherScroll';
import { useRouter } from 'expo-router';

export const WeatherSection: React.FC<WeatherSectionProps> = ({
  weather,
  location,
  onCalendarPress
}) => {
  const scrollViewRef = useWeatherScroll(weather);
  const router = useRouter();

  useEffect(() => {
    console.log('WeatherSection rendered with props:', { weather, location });
  }, [weather, location]);

  if (!weather || !location) {
    console.log('Missing data:', { weather, location });
    return (
      <View style={styles.weatherSection}>
        <TouchableOpacity 
          style={styles.locationRow}
          onPress={() => {
            console.log('Navigating to location search');
            router.push('/localisation-search');
          }}
        >
          <View style={styles.location}>
            <MapPinIcon size={18} color="#666" />
            <Text style={styles.locationText}>Sélectionner une localisation</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.weatherSection}>
      <View>
        <TouchableOpacity 
          style={styles.locationRow}
          onPress={() => {
            console.log('Navigating to location search');
            router.push('/localisation-search');
          }}
        >
          <View style={styles.location}>
            <MapPinIcon size={18} color="#666" />
            <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.calendarLink}
          onPress={onCalendarPress}
          activeOpacity={0.7}
        >
          <Text style={styles.calendarText}>Tenue du jour calendrier</Text>
          <ChevronLeftIcon 
            size={16} 
            style={{ transform: [{ rotate: '180deg' }] }}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>

      {weather.forecast && weather.forecast.length > 0 ? (
        <ScrollView 
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weatherScrollContainer}
        >
          {weather.forecast.map((dayWeather) => {
            console.log('Rendering weather card for:', dayWeather);
            return (
              <View key={dayWeather.date} style={{ width: 340 }}>
                <WeatherCard 
                  dayWeather={dayWeather}
                  currentDate={weather.currentDate}
                />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};