import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MapPinIcon, ChevronLeftIcon } from 'lucide-react-native';
import { WeatherCard } from './WeatherCard';
import { styles } from '../styles';
import { WeatherSectionProps } from '../types';
import { useWeatherScroll } from '@/hooks/profile/HeaderModal/useWeatherScroll';

export const WeatherSection: React.FC<WeatherSectionProps> = ({
  weather,
  location,
  onCalendarPress
}) => {
  const scrollViewRef = useWeatherScroll(weather);

  return (
    <View style={styles.weatherSection}>
      <View style={styles.locationRow}>
        <View style={styles.location}>
          <MapPinIcon size={20} color="#666" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <TouchableOpacity 
          style={styles.calendarLink}
          onPress={onCalendarPress}
          activeOpacity={0.7}
        >
          <Text style={styles.calendarText}>Tenue du jour calendrier</Text>
          <ChevronLeftIcon 
            size={20} 
            style={{ transform: [{ rotate: '180deg' }] }}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weatherScrollContainer}
      >
        {weather.forecast.map((dayWeather) => (
          <View key={dayWeather.date} style={{ width: 340 }}>
            <WeatherCard 
              dayWeather={dayWeather}
              currentDate={weather.currentDate}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};