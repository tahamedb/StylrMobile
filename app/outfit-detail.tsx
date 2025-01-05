import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useOutfits } from '@/hooks/profile/BodyModal/useOutfits';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { Outfit, ClothingItem } from '@/types/api.types';

export default function OutfitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { deleteOutfit } = useOutfits();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadOutfit();
  }, [id]);

  const loadOutfit = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);
      const outfit = await wardrobeService.getOutfitById(parseInt(id, 10));
      if (!outfit) {
        throw new Error('Outfit not found');
      }
      setOutfit(outfit);
    } catch (err) {
      console.error('Error loading outfit:', err);
      setError('Failed to load outfit details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (!outfit) return;
    router.push({
      pathname: '/edit-outfit',
      params: { id: outfit.id }
    });
  };

  const handleDelete = () => {
    if (!outfit || isDeleting) return;

    Alert.alert(
      'Delete Outfit',
      'Are you sure you want to delete this outfit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleting(true);
              await deleteOutfit(outfit.id);
              router.back();
            } catch (err) {
              console.error('Error deleting outfit:', err);
              Alert.alert('Error', 'Failed to delete outfit');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  const renderClothingItem = (item: ClothingItem | { id: number } | undefined) => {
    if (!item) return null;

    const clothingItem = item as ClothingItem;
    if (!clothingItem.name) return null;

    return (
      <View style={styles.itemCard}>
        {clothingItem.imageUrl ? (
          <Image
            source={{ uri: clothingItem.imageUrl }}
            style={styles.itemImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.itemPlaceholder}>
            <Ionicons name="shirt-outline" size={24} color="#687076" />
          </View>
        )}
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{clothingItem.name}</Text>
          <Text style={styles.itemCategory}>{clothingItem.category}</Text>
        </View>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: false
          }}
        />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff3b30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadOutfit}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: false
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
          <Text style={styles.loadingText}>Loading outfit details...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#11181C" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEdit}
            >
              <Ionicons name="pencil" size={20} color="#11181C" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color="#ff3b30" />
              ) : (
                <Ionicons name="trash-outline" size={20} color="#ff3b30" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.outfitInfo}>
          <Text style={styles.outfitName}>{outfit?.name}</Text>
          {outfit?.description && (
            <Text style={styles.outfitDescription}>{outfit.description}</Text>
          )}
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{outfit?.season}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{outfit?.occasion}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemsContainer}>
          {renderClothingItem(outfit?.top)}
          {renderClothingItem(outfit?.bottom)}
          {renderClothingItem(outfit?.dress)}
          {renderClothingItem(outfit?.outerwear)}
          {renderClothingItem(outfit?.shoes)}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{outfit?.rating?.toFixed(1) || '0.0'}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{outfit?.timesWorn || 0}</Text>
            <Text style={styles.statLabel}>Times Worn</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
  },
  deleteButton: {
    backgroundColor: '#FFE5E5',
  },
  outfitInfo: {
    marginBottom: 24,
  },
  outfitName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 8,
  },
  outfitDescription: {
    fontSize: 16,
    color: '#687076',
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F3F5',
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#687076',
  },
  itemsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
    overflow: 'hidden',
    height: 100,
  },
  itemImage: {
    width: 100,
    height: '100%',
  },
  itemPlaceholder: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#11181C',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#687076',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#687076',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E6E8EB',
    marginHorizontal: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#11181C',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#0a7ea4',
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#11181C',
    fontWeight: '500',
  },
}); 