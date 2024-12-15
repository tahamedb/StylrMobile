import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ClothingDetailView } from '@/components/wardrobe/clothingDetail/Body/ClothingDetailView';
import { useClothingDetail } from '@/hooks/wardrobe/useClothingDetail';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import { ClothingItem } from '@/types/api.types';

export default function ClothingDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const params = useLocalSearchParams();
  const [newClothingItem, setNewClothingItem] = useState<Partial<ClothingItem> | null>(null);
 
  // Check if this is a new item from upload
  const isNewItem = params.isNewItem === "true";
  const imageBase64 = params.imageBase64 as string;

  // Only parse ID if it's not a new item
  const id = !isNewItem && typeof params.id === 'string' ? parseInt(params.id, 10) : undefined;

  // Fetch existing clothing detail only if not a new item
  const { clothingDetail, loading, error } = useClothingDetail(id || 0, !isNewItem);

  useEffect(() => {
    if (isNewItem && imageBase64) {
      // Create a new clothing item with the uploaded image
      setNewClothingItem({
        imageUrl: `data:image/jpeg;base64,${imageBase64}`,
        name: '',
        category: '',
        color: '',
        size: '',
        material: '',
        season: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        brand: '',
        rating: 0,
        price: 0,
        purchaseDate: '',
        purchaseLink: '',
        colors: [],
      });
    }
  }, [isNewItem, imageBase64]);

  if (loading && !isNewItem) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={isDark ? 'white' : 'black'} />
        </View>
      </SafeAreaView>
    );
  }

  if (error && !isNewItem) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ThemedText>Erreur: {error.message}</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  // Use newClothingItem for new items, clothingDetail for existing ones
  const itemToDisplay = isNewItem ? newClothingItem : clothingDetail;

  if (!itemToDisplay) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ClothingDetailView 
        imageUrl={itemToDisplay.imageUrl || ''}
        brand={itemToDisplay.name || ''}
        date={itemToDisplay.createdAt || ''}
        isDark={isDark}
        clothingDetail={itemToDisplay as ClothingItem}
        isNewItem={isNewItem}
      />
    
    </SafeAreaView>
  );
}