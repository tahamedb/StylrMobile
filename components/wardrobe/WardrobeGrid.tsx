import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { ClothingItem } from '@/types/api.types';
import { getOptimizedImageUrl } from '@/services/Cloudinary/CloudinaryServices';

interface WardrobeGridProps {
  items: ClothingItem[];
  onItemPress: (item: ClothingItem) => void;
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({ items, onItemPress }) => {
  const renderItem = ({ item }: { item: ClothingItem }) => (
    <View style={styles.itemContainer} onTouchEnd={() => onItemPress(item)}>
      <Image
        source={{ 
          uri: getOptimizedImageUrl(item.imageUrl, 'thumbnail'),
          cache: 'force-cache'
        }}
        style={styles.image}
      />
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      maxToRenderPerBatch={8}
      windowSize={5}
      removeClippedSubviews={true}
      initialNumToRender={8}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default WardrobeGrid; 