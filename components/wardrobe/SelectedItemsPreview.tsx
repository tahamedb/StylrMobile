import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ClothingItem } from '@/types/api.types';
import { getOptimizedImageUrl } from '@/services/Cloudinary/CloudinaryServices';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

interface SelectedItemsPreviewProps {
  items: ClothingItem[];
  onRemoveItem: (item: ClothingItem) => void;
}

export function SelectedItemsPreview({ items, onRemoveItem }: SelectedItemsPreviewProps) {
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>
          Sélectionnez des vêtements pour créer une tenue
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image
            source={{ 
              uri: getOptimizedImageUrl(item.imageUrl, 'thumbnail'),
              cache: 'force-cache'
            }}
            style={styles.image}
          />
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => onRemoveItem(item)}
          >
            <Ionicons name="close-circle" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 12,
  },
  itemContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 