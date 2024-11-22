import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { BellIcon, BookmarkIcon, ChevronLeftIcon, MapPinIcon, CalendarIcon,CalendarPlus,Sun } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { styles } from './styles';
import { HeaderModalProps } from './types';
import { DailyWeather } from './types';


export const HeaderModal: React.FC<HeaderModalProps> = ({
  variant,
  username,
  location,
  weather,
  //isLoading,
  onToggleVariant,
  onCalendarPress,
  onSettingsPress,
  onNotificationPress,
  onBookmarkPress,
}) => {
  const isPrivate = variant === 'private';
  const scrollViewRef = useRef<ScrollView>(null);
  
  useEffect(() => {
    // Trouver l'index de "aujourd'hui"
    const todayIndex = weather?.forecast.findIndex(
      (day) => day.date === weather.currentDate
    ) || 0;

    // Calculer la position de scroll (largeur de carte * index)
    const scrollPosition = todayIndex * 340; // 320 est la largeur approximative d'une carte

    // Scroll à la position calculée après le rendu
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: scrollPosition,
        animated: false
      });
    }, 100);
  }, [weather]);


  const renderWeatherCard = (dayWeather: DailyWeather) => (
    <View style={styles.weatherCard}>
      <View>
        <View style={styles.dayHeader}>
          <Text style={styles.dayText1}>{dayWeather.dayName}</Text>
          <Text style={styles.dayText}>{dayWeather.date}</Text>
  
          {dayWeather.date === weather?.currentDate && (
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

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <Animated.View 
        entering={FadeIn} 
        exiting={FadeOut} 
        style={styles.topBar}
      >
        {isPrivate ? (
          <>
            <Text style={styles.logo}>WeWear</Text>
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.iconButton}
                activeOpacity={0.7}
                accessible={true}
                accessibilityLabel="Notifications"
                onPress={onNotificationPress}
              >
                <BellIcon size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton}
                activeOpacity={0.7}
                accessible={true}
                accessibilityLabel="Favoris"
                onPress={onBookmarkPress}
              >
                <BookmarkIcon size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity 
              onPress={onToggleVariant}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <ChevronLeftIcon size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.titlePublic}>Profil public</Text>
          </>
        )}
      </Animated.View>

      {/* User Info */}
      <View style={styles.userSection}>
        <Image 
          source={require('@/assets/images/avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          {isPrivate && (
            <TouchableOpacity 
              onPress={onToggleVariant}
              activeOpacity={0.7}
            >
              <Text style={styles.publicLink}>Voir le profil public.</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Weather Section for Private Profile */}
      {isPrivate && weather && (
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
                {renderWeatherCard(dayWeather)}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Public Profile Content */}
      {!isPrivate && (
        <View style={styles.publicContent}>
          <TouchableOpacity style={styles.bioPrompt}>
            <Text style={styles.bioText}>Ajoutez une présentation</Text>
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>

          <View style={[styles.statsAndSettings]}>
  <View style={styles.statsSection}>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>0</Text>
        <Text style={styles.statLabel}>Abonné(e)</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>0</Text>
        <Text style={styles.statLabel}>S'abonner</Text>
      </View>
    </View>
  </View>
  <TouchableOpacity 
    style={styles.settingsButton}
    onPress={onSettingsPress}
    activeOpacity={0.7}
  >
    <Text style={styles.settingsText}>Paramètres du profil</Text>
  </TouchableOpacity>
</View>

        </View>
      )}
    </View>
  );
};