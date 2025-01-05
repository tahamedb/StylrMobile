import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';

interface RecommendationItem {
  id: string;
  baseItem: ClothingItem;
  matchingItem: ClothingItem;
  confidence: number;
  reason: string;
}

export const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      // For demo purposes, we'll get all items and use the first one as base
      const items = await wardrobeService.getAllClothingItems();
      if (items && items.length > 0) {
        const recs = await wardrobeService.getOutfitRecommendations(items[0]);
        setRecommendations(recs);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRecommendation = ({ item }: { item: RecommendationItem }) => (
    <View style={styles.recommendationCard}>
      <View style={styles.itemsContainer}>
        <View style={styles.itemBox}>
          <Image source={{ uri: item.baseItem.imageUrl }} style={styles.itemImage} />
          <Text style={styles.itemLabel}>Base Item</Text>
        </View>
        <Text style={styles.plus}>+</Text>
        <View style={styles.itemBox}>
          <Image source={{ uri: item.matchingItem.imageUrl }} style={styles.itemImage} />
          <Text style={styles.itemLabel}>Matching Item</Text>
        </View>
      </View>
      <View style={styles.confidenceContainer}>
        <Text style={styles.confidenceText}>{item.confidence}% Match</Text>
        <Text style={styles.reasonText}>{item.reason}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading recommendations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color-Matched Recommendations</Text>
      <FlatList
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    gap: 16,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  itemBox: {
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  plus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  confidenceContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  reasonText: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});