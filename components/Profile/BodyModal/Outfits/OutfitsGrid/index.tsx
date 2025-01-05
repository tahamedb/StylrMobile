import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Outfit } from '@/types/api.types';
import { OutfitCard } from '@/components/wardrobe/OutfitCard';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

interface OutfitsGridProps {
  outfits: Outfit[];
  variant: 'private' | 'public';
}

export default function OutfitsGrid({ outfits, variant }: OutfitsGridProps) {
  const router = useRouter();

  const handleOutfitPress = (outfitId: number) => {
    router.push({
      pathname: '/outfit-detail',
      params: { id: outfitId }
    });
  };

  const handleCreateOutfit = () => {
    router.push('/create-outfit');
  };

  const renderHeader = () => {
    if (variant !== 'private') return null;
    
    return (
      <TouchableOpacity 
        style={styles.createIdeaBox}
        onPress={handleCreateOutfit}
      >
        <View style={styles.iconContainer}>
          <Ionicons 
            name="add-circle-outline" 
            size={48} 
            color="#9E9E9E" 
          />
        </View>
        <Text style={styles.createIdeaText}>Créer une tenue</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item: outfit }: { item: Outfit }) => (
    <View style={styles.outfitCard}>
      <OutfitCard 
        outfit={outfit} 
        onPress={() => handleOutfitPress(outfit.id)}
      />
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>
        Aucune tenue trouvée
      </Text>
    </View>
  );

  return (
    <FlatList
      data={outfits}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyComponent}
      numColumns={2}
      columnWrapperStyle={styles.outfitsGrid}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
  );
} 