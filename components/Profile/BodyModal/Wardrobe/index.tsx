import React, { useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Lock, AlertCircle, Shirt, Eye, Trash2 } from 'lucide-react-native';
import { useWardrobe } from '@/hooks/profile/BodyModal/useWardrobe';
import { useProfile } from '@/hooks/profile/HeaderModal/useProfile';
import { styles } from './styles';
import { useRouter } from 'expo-router';
import { Wardrobe as WardrobeType } from '@/types/api.types';
import { WardrobeModal } from '@/components/wardrobe/WardrobeModal';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { useWardrobe as useWardrobeContext } from '@/contexts/WardrobeContext';

export const Wardrobe = ({ variant }: { variant: 'private' | 'public' }) => {
  const router = useRouter();
  const { user } = useProfile(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { 
    wardrobeData, 
    wardrobes = [], 
    isLoading, 
    error, 
    currentWardrobe,
    refetch 
  } = useWardrobe();
  const { refreshWardrobes } = useWardrobeContext();

  const totalItems = (wardrobeData || []).length;
  const previewItems = (wardrobeData || []).slice(0, 4);

  const sortedWardrobes = useMemo(() => {
    const wardrobe_array = wardrobes || [];
    return [...wardrobe_array].sort((a, b) => {
      // Sort by most recently updated
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [wardrobes]);

  const filteredWardrobes = variant === 'public'
    ? sortedWardrobes.filter(wardrobe => wardrobe.user?.id === user?.id)
    : sortedWardrobes;

  if (variant === 'public' && filteredWardrobes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Shirt size={48} color="#666" />
        <Text style={styles.emptyText}>
          Aucune garde-robe de {user?.username || 'cet utilisateur'}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <AlertCircle size={24} color="#FF0000" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={refetch} style={styles.retryButton}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleWardrobePress = (wardrobe?: WardrobeType) => {
    if (wardrobe?.id) {
      // Navigate to specific wardrobe view with the wardrobe data
      router.push({
        pathname: '/wardrobe',
        params: { 
          id: String(wardrobe.id),
          name: wardrobe.name,
          itemCount: wardrobe.clothingItems?.length || 0,
          isSpecificWardrobe: 'true'
        }
      });
    } else {
      // Navigate to all clothes view
      router.push({
        pathname: '/wardrobe',
        params: {
          isSpecificWardrobe: 'false'
        }
      });
    }
  };

  const renderWardrobePreview = (items: WardrobeType['clothingItems'] = []) => (
    <View style={styles.previewGrid}>
      {items.slice(0, 4).map((item, index) => (
        <Image
          key={item.id}
          source={{ uri: item.imageUrl }}
          style={[
            styles.smallPreviewImage,
            index % 2 === 1 && styles.rightImage,
            index > 1 && styles.bottomImage
          ]}
        />
      ))}
      {items.length === 0 && (
        <View style={styles.emptyPreview}>
          <Shirt size={24} color="#666" />
        </View>
      )}
    </View>
  );

  const handleDeleteWardrobe = async (wardrobe: WardrobeType) => {
    Alert.alert(
      'Supprimer la garde-robe',
      `Êtes-vous sûr de vouloir supprimer "${wardrobe.name}" ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await wardrobeService.deleteWardrobe(wardrobe.id);
              // Refresh both the wardrobe data and the wardrobes list
              await refreshWardrobes();
              // If this was the current wardrobe, navigate back
              if (currentWardrobe?.id === wardrobe.id) {
                router.back();
              }
            } catch (error) {
              console.error('Failed to delete wardrobe:', error);
              Alert.alert('Erreur', 'Impossible de supprimer la garde-robe');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.grid}>
        {/* All Clothes Section */}
        {variant === 'private' && (
          <TouchableOpacity 
            style={[styles.gridItem, styles.allClothesItem]}
            onPress={() => handleWardrobePress()}
          >
            {renderWardrobePreview(previewItems)}
            <View style={styles.itemFooter}>
              <Text style={styles.itemTitle}>Tous les vêtements</Text>
              <View style={styles.countContainer}>
                <Lock size={16} color="#666" />
                <Text style={styles.countText}>{totalItems}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Created Wardrobes */}
        {filteredWardrobes.map((wardrobe) => (
          <TouchableOpacity
            key={wardrobe.id}
            style={[
              styles.gridItem,
              currentWardrobe?.id === wardrobe.id && styles.selectedItem
            ]}
            onPress={() => handleWardrobePress(wardrobe)}
          >
            {renderWardrobePreview(wardrobe.clothingItems)}
            <View style={styles.itemFooter}>
              <View style={styles.itemTitleContainer}>
                <Text style={styles.itemTitle}>{wardrobe.name}</Text>
                <Text style={styles.itemDate}>
                  {new Date(wardrobe.updatedAt).toLocaleDateString('fr-FR')}
                </Text>
              </View>
              <View style={styles.countContainer}>
                {variant === 'private' && (
                  <TouchableOpacity 
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteWardrobe(wardrobe);
                    }}
                    style={styles.actionButton}
                  >
                    <Trash2 size={16} color="#666" />
                  </TouchableOpacity>
                )}
                <View style={styles.actionButton}>
                  {variant === 'private' ? (
                    <Lock size={16} color="#666" />
                  ) : (
                    <Eye size={16} color="#666" />
                  )}
                  <Text style={styles.countText}>
                    {wardrobe.clothingItems?.length || 0}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Create Wardrobe Button */}
        {variant === 'private' && (
          <TouchableOpacity 
            style={[styles.gridItem, styles.createItem]}
            onPress={() => setShowCreateModal(true)}
          >
            <View style={styles.createButton}>
              <View style={styles.plusIcon}>
                <Text style={styles.plusText}>+</Text>
              </View>
              <Text style={styles.createText}>Créer une garde-robe</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <WardrobeModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </ScrollView>
  );
};