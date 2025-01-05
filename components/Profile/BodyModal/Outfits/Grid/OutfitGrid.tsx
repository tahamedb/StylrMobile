import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Outfit } from '@/types/api.types';
import { OutfitCard } from '@/components/wardrobe/OutfitCard';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface OutfitGridProps {
  outfits: Outfit[];
  variant: 'private' | 'public';
  onOutfitPress?: (outfit: Outfit) => void;
  onCreatePress?: () => void;
  emptyStateMessage?: string;
}

export function OutfitGrid({ 
  outfits, 
  variant,
  onOutfitPress,
  onCreatePress,
  emptyStateMessage = 'Aucune tenue trouvée'
}: OutfitGridProps) {
  const router = useRouter();

  const handleOutfitPress = (outfit: Outfit) => {
    if (onOutfitPress) {
      onOutfitPress(outfit);
    } else {
      router.push({
        pathname: '/outfit-detail',
        params: { id: outfit.id }
      });
    }
  };

  const handleCreatePress = () => {
    if (onCreatePress) {
      onCreatePress();
    } else {
      router.push('/create-outfit');
    }
  };

  const renderHeader = () => {
    if (variant !== 'private') return null;
    
    return (
      <TouchableOpacity 
        style={styles.createBox}
        onPress={handleCreatePress}
      >
        <View style={styles.iconContainer}>
          <Ionicons 
            name="add-circle-outline" 
            size={48} 
            color="#9E9E9E" 
          />
        </View>
        <Text style={styles.createText}>Créer une tenue</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item: outfit }: { item: Outfit }) => (
    <View style={styles.outfitCard}>
      <OutfitCard 
        outfit={outfit} 
        onPress={() => handleOutfitPress(outfit)}
      />
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>
        {emptyStateMessage}
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
      columnWrapperStyle={styles.gridContainer}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
  );
} 