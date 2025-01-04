import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ClothingItem } from '@/types/api.types';

interface WardrobeStatsProps {
  items: ClothingItem[];
}

export function WardrobeStats({ items }: WardrobeStatsProps) {
  const stats = useMemo(() => {
    return {
      totalItems: items.length,
      totalValue: items.reduce((sum, item) => sum + (item.price || 0), 0),
      byCategory: items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      bySeason: items.reduce((acc, item) => {
        acc[item.season] = (acc[item.season] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }, [items]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Overview</ThemedText>
        <View style={styles.row}>
          <ThemedText>Total Items</ThemedText>
          <ThemedText>{stats.totalItems}</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Total Value</ThemedText>
          <ThemedText>${stats.totalValue.toFixed(2)}</ThemedText>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>By Category</ThemedText>
        {Object.entries(stats.byCategory).map(([category, count]) => (
          <View key={category} style={styles.row}>
            <ThemedText>{category}</ThemedText>
            <ThemedText>{count}</ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>By Season</ThemedText>
        {Object.entries(stats.bySeason).map(([season, count]) => (
          <View key={season} style={styles.row}>
            <ThemedText>{season}</ThemedText>
            <ThemedText>{count}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
}); 