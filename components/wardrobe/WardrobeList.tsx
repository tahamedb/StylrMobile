import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Wardrobe } from '@/types/api.types';
import { WardrobeListHeader } from './WardrobeListHeader';
import { WardrobeDetailsModal } from './WardrobeDetailsModal';

interface WardrobeListProps {
  onEditWardrobe?: (wardrobe: Wardrobe) => void;
  onDeleteWardrobe?: (wardrobe: Wardrobe) => void;
}

export function WardrobeList({ onEditWardrobe, onDeleteWardrobe }: WardrobeListProps) {
  const { wardrobes, currentWardrobe, setCurrentWardrobe } = useWardrobe();
  const [sortBy, setSortBy] = useState<'name' | 'items' | 'date'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedWardrobe, setSelectedWardrobe] = useState<Wardrobe | null>(null);

  const sortedWardrobes = useMemo(() => {
    return [...wardrobes].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'items':
          comparison = (a.clothingItems?.length || 0) - (b.clothingItems?.length || 0);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [wardrobes, sortBy, sortDirection]);

  const handleSort = (option: 'name' | 'items' | 'date') => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  const handleWardrobePress = (wardrobe: Wardrobe) => {
    setCurrentWardrobe(wardrobe);
    setSelectedWardrobe(wardrobe);
  };

  const renderWardrobe = ({ item }: { item: Wardrobe }) => {
    const isSelected = currentWardrobe?.id === item.id;

    return (
      <TouchableOpacity 
        style={[styles.wardrobeItem, isSelected && styles.selectedItem]}
        onPress={() => handleWardrobePress(item)}
      >
        <View style={styles.wardrobeInfo}>
          <ThemedText style={styles.wardrobeName}>{item.name}</ThemedText>
          <ThemedText style={styles.itemCount}>
            {item.clothingItems?.length || 0} items
          </ThemedText>
        </View>
        
        <View style={styles.actions}>
          {isSelected && (
            <MaterialCommunityIcons name="check" size={24} color="#000" />
          )}
          {onEditWardrobe && (
            <TouchableOpacity 
              onPress={() => onEditWardrobe(item)}
              style={styles.actionButton}
            >
              <MaterialCommunityIcons name="pencil" size={20} color="#666" />
            </TouchableOpacity>
          )}
          {onDeleteWardrobe && item.id !== currentWardrobe?.id && (
            <TouchableOpacity 
              onPress={() => onDeleteWardrobe(item)}
              style={styles.actionButton}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#666" />
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            onPress={() => setSelectedWardrobe(item)}
            style={styles.actionButton}
          >
            <MaterialCommunityIcons name="information" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <WardrobeListHeader
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
        onSearch={() => {/* Implement search */}}
      />

      <FlatList
        data={sortedWardrobes}
        renderItem={renderWardrobe}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
      />

      {selectedWardrobe && (
        <WardrobeDetailsModal
          visible={!!selectedWardrobe}
          onClose={() => setSelectedWardrobe(null)}
          wardrobe={selectedWardrobe}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  wardrobeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  wardrobeInfo: {
    flex: 1,
  },
  wardrobeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
}); 