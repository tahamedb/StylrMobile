import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Outfit } from '@/types/api.types';
import { getOptimizedImageUrl } from '@/services/Cloudinary/CloudinaryServices';

interface OutfitCardProps {
  outfit: Outfit;
  onPress: () => void;
}

export function OutfitCard({ outfit, onPress }: OutfitCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {outfit.imageUrl ? (
        <Image
          source={{ 
            uri: getOptimizedImageUrl(outfit.imageUrl, 'thumbnail'),
            cache: 'force-cache'
          }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <ThemedText style={styles.placeholderText}>
            Aucune image
          </ThemedText>
        </View>
      )}
      <View style={styles.overlay}>
        <ThemedText style={styles.name}>
          {outfit.name || 'Sans nom'}
        </ThemedText>
        <ThemedText style={styles.date}>
          {new Date(outfit.createdAt).toLocaleDateString('fr-FR')}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
}); 