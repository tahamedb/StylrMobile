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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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

    if (!('name' in item)) {
      return (
        <View style={styles.clothingItem}>
          <View style={styles.placeholderImage}>
            <Ionicons name="shirt-outline" size={32} color="#666" />
          </View>
          <BlurView intensity={80} style={styles.itemOverlay}>
            <Text style={styles.itemName} numberOfLines={1}>
              Loading...
            </Text>
          </BlurView>
        </View>
      );
    }

    return (
      <View style={styles.clothingItem}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.clothingImage}
          resizeMode="cover"
        />
        <BlurView intensity={80} style={styles.itemOverlay}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.itemCategory} numberOfLines={1}>
            {item.category}
          </Text>
        </BlurView>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading outfit...</Text>
        </View>
      </View>
    );
  }

  if (error || !outfit) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff3b30" />
          <Text style={styles.errorText}>{error || 'Outfit not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadOutfit}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={StyleSheet.absoluteFill}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEdit}
            >
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]}
              onPress={handleDelete}
              disabled={isDeleting}
            >
              <Ionicons name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{outfit?.name}</Text>
          {outfit.description && (
            <Text style={styles.description}>{outfit.description}</Text>
          )}

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Season</Text>
                <Text style={styles.infoValue}>{outfit.season}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Occasion</Text>
                <Text style={styles.infoValue}>{outfit.occasion}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Times Worn</Text>
                <Text style={styles.infoValue}>{outfit.timesWorn}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Rating</Text>
                <Text style={styles.infoValue}>{outfit.rating}/5</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.itemsGrid}>
            {outfit.top && renderClothingItem(outfit.top)}
            {outfit.bottom && renderClothingItem(outfit.bottom)}
            {outfit.dress && renderClothingItem(outfit.dress)}
            {outfit.outerwear && renderClothingItem(outfit.outerwear)}
            {outfit.shoes && renderClothingItem(outfit.shoes)}
          </View>

          {outfit.accessories && outfit.accessories.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Accessories</Text>
              <View style={styles.itemsGrid}>
                {outfit.accessories.map((accessory, index) => (
                  <React.Fragment key={accessory.id}>
                    {renderClothingItem(accessory)}
                  </React.Fragment>
                ))}
              </View>
            </>
          )}

          {outfit.tags && outfit.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsList}>
                {outfit.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 24,
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.6,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  clothingItem: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  clothingImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
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
    color: '#fff',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}); 