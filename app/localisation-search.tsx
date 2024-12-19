import { useRouter } from 'expo-router';
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ArrowLeft, MapPin } from "lucide-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '@/components/Profile/HeaderModal/Localisation/styles';
import * as Location from 'expo-location'; 
import { LocationType } from '@/types/api.types';
import { useLocationWeather } from '@/hooks/profile/HeaderModal/useLocationWeather';

export default function LocalisationSearchScreen() {
  const router = useRouter();
  const { updateLocation } = useLocationWeather();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<LocationType[]>([]);
  const [recentSearches, setRecentSearches] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const saved = await AsyncStorage.getItem('recentLocations');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erreur chargement recherches récentes:', error);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&accept-language=fr`,
        {
          headers: {
            'User-Agent': 'Stylr'
          }
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Erreur de recherche:', error);
      Alert.alert('Erreur', 'Impossible d\'effectuer la recherche');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLocationSelect = async (location: LocationType) => {
    try {
      console.log('Selecting new location:', location);

      // Mise à jour des recherches récentes
      const newRecents = [
        location,
        ...recentSearches.filter(item => item.place_id !== location.place_id)
      ].slice(0, 5);
      
      setRecentSearches(newRecents);
      await AsyncStorage.setItem('recentLocations', JSON.stringify(newRecents));
      await AsyncStorage.setItem('selectedLocation', JSON.stringify(location));
      
      // Mise à jour de la localisation et de la météo
      await updateLocation(location);
      console.log('Location and weather updated successfully');
      
      router.back();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la localisation:', error);
      Alert.alert('Erreur', 'Impossible de mettre à jour la localisation');
    }
  };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'La permission de localisation est nécessaire');
        return;
      }

      const position = await Location.getCurrentPositionAsync({});
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&accept-language=fr`,
        {
          headers: {
            'User-Agent': 'Stylr'
          }
        }
      );
      const location = await response.json();
      await handleLocationSelect(location);
    } catch (error) {
      console.error('Erreur géolocalisation:', error);
      Alert.alert('Erreur', 'Impossible d\'obtenir votre position');
    } finally {
      setIsLoading(false);
    }
  };

  // ... reste du composant (retour JSX) inchangé ...
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="#666666" size={24} />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Recherche par ville"
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              handleSearch(text);
            }}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.currentLocationButton}
        onPress={getCurrentLocation}
        disabled={isLoading}
      >
        <MapPin size={20} color="#666666" />
        <Text style={styles.locationText}>Localisation actuelle</Text>
        <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
      </TouchableOpacity>

      {isLoading && (
        <ActivityIndicator style={styles.loader} color="#666666" />
      )}

      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <TouchableOpacity 
            key={result.place_id}
            style={styles.locationRow}
            onPress={() => handleLocationSelect(result)}
          >
            <MapPin size={20} color="#666666" />
            <Text style={styles.locationText} numberOfLines={2}>
              {result.display_name}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        recentSearches.length > 0 && !searchTerm && (
          <View>
            <Text style={styles.recentTitle}>Recherches récentes</Text>
            {recentSearches.map((location) => (
              <TouchableOpacity 
                key={location.place_id}
                style={styles.locationRow}
                onPress={() => handleLocationSelect(location)}
              >
                <MapPin size={20} color="#666666" />
                <Text style={styles.locationText} numberOfLines={2}>
                  {location.display_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )
      )}
    </View>
  );
}