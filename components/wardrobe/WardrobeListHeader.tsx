import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type SortOption = 'name' | 'items' | 'date';
type SortDirection = 'asc' | 'desc';

interface WardrobeListHeaderProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSort: (option: SortOption) => void;
  onSearch: () => void;
}

export function WardrobeListHeader({ 
  sortBy, 
  sortDirection, 
  onSort, 
  onSearch 
}: WardrobeListHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.sortButtons}>
        <TouchableOpacity 
          style={[styles.sortButton, sortBy === 'name' && styles.active]} 
          onPress={() => onSort('name')}
        >
          <ThemedText>Name</ThemedText>
          {sortBy === 'name' && (
            <MaterialCommunityIcons 
              name={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'} 
              size={16} 
              color="#000" 
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sortButton, sortBy === 'items' && styles.active]}
          onPress={() => onSort('items')}
        >
          <ThemedText>Items</ThemedText>
          {sortBy === 'items' && (
            <MaterialCommunityIcons 
              name={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'} 
              size={16} 
              color="#000" 
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sortButton, sortBy === 'date' && styles.active]}
          onPress={() => onSort('date')}
        >
          <ThemedText>Date</ThemedText>
          {sortBy === 'date' && (
            <MaterialCommunityIcons 
              name={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'} 
              size={16} 
              color="#000" 
            />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <MaterialCommunityIcons name="magnify" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
  },
  active: {
    backgroundColor: '#f0f0f0',
  },
  searchButton: {
    padding: 8,
  },
}); 