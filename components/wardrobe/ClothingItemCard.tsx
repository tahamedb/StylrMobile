import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ClothingItem } from '@/types/api.types';
import { getOptimizedImageUrl } from '@/services/Cloudinary/CloudinaryServices';
import { Ionicons } from '@expo/vector-icons';

export interface ClothingItemCardProps {
  item: ClothingItem;
  onPress?: () => void;
  isSelected?: boolean;
  width?: number;
}

export function ClothingItemCard({ item, onPress, isSelected = false, width }: ClothingItemCardProps) {
  const imageUrl = getOptimizedImageUrl(item.imageUrl);

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.container,
        width ? { width, height: width } : null,
        isSelected && styles.selected,
      ]}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      {isSelected && (
        <View style={styles.selectedOverlay}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#000',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 