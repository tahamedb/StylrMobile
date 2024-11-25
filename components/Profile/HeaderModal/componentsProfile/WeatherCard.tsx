import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sun, CalendarPlus } from 'lucide-react-native';
import { styles } from '../styles';
import { WeatherCardProps } from '../types';

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  dayWeather, 
  currentDate 
}) => (
  <View style={styles.weatherCard}>
    <View>
      <View style={styles.dayHeader}>
        <Text style={styles.dayText1}>{dayWeather.dayName}</Text>
        <Text style={styles.dayText}>{dayWeather.date}</Text>

        {dayWeather.date === currentDate && (
          <View style={styles.todayBadge}>
            <Text style={styles.todayText}>Aujourd'hui</Text>
          </View>
        )}
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.tempText}>{dayWeather.temp} / {dayWeather.minTemp}°C</Text>
        <Sun size={30} color="#FFB800" />
      </View>
    </View>
    <View style={styles.calendarContainer}>
      <TouchableOpacity style={styles.calendarButton}>
        <CalendarPlus size={35} color="black" strokeWidth={1.5} />
      </TouchableOpacity>
    </View>
  </View>
);