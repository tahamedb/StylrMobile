import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ClothingItem } from '@/types/api.types';
import AllClothesGrid from '@/components/wardrobe/AllClothesGrid';
import { useWardrobeContent } from '@/hooks/wardrobe/useWardrobeContent';
import { useRouter } from 'expo-router';

const AllClothesScreen: React.FC = () => {
  const router = useRouter();
  const { clothingItems: allItems } = useWardrobeContent();

  // Filter out any non-ClothingItem entries
  const items = allItems.filter((item): item is ClothingItem => 
    'category' in item && 'color' in item
  );

  const handleItemPress = (item: ClothingItem) => {
    router.push({
      pathname: '/clothing-detail',
      params: {
        itemId: item.id || 0,
        wardrobeId: item.wardrobe?.id || 0
      }
    });
  };

  return (
    <View style={styles.container}>
      <AllClothesGrid 
        items={items}
        onItemPress={handleItemPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AllClothesScreen; 