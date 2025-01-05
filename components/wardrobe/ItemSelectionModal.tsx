import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, ActivityIndicator } from 'react-native';
import { ClothingItem } from '@/types/api.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItemCard } from './ClothingItemCard';

interface ItemSelectionModalProps {
  visible: boolean;
  category: string;
  onSelect: (item: ClothingItem) => void;
  onClose: () => void;
}

export function ItemSelectionModal({ visible, category, onSelect, onClose }: ItemSelectionModalProps) {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      loadItems();
    }
  }, [category, visible]);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const allItems = await wardrobeService.getAllClothingItems();
      console.log('All items:', allItems);
      const filteredItems = allItems.filter(item => 
        item.category?.toLowerCase() === category.toLowerCase()
      );
      console.log('Filtered items for category:', category, filteredItems);
      setItems(filteredItems);
    } catch (error) {
      console.error('Error loading items:', error);
      setError('Failed to load items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ClothingItem }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <ClothingItemCard item={item} />
      <Text style={styles.itemName} numberOfLines={1}>
        {item.name || 'Unnamed Item'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Select {category}</Text>
          <View style={{ width: 24 }} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.loadingText}>Loading items...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadItems}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubtext}>
              Add some {category.toLowerCase()} items to your wardrobe
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id?.toString() || ''}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  grid: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  itemName: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 