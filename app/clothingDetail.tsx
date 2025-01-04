import { SafeAreaView, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ClothingDetailView } from '@/components/wardrobe/clothingDetail/Body/ClothingDetailView';
import { useClothingDetail } from '@/hooks/wardrobe/useClothingDetail';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import { ClothingItem } from '@/types/api.types';
import { WardrobeSelector } from '@/components/wardrobe/WardrobeSelector';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { useRouter } from 'expo-router';

export default function ClothingDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const params = useLocalSearchParams();
  const [newClothingItem, setNewClothingItem] = useState<Partial<ClothingItem> | null>(null);
  const { currentWardrobe } = useWardrobe();
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

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

  const handleSave = async (itemData: Partial<ClothingItem>) => {
    if (!currentWardrobe) {
      // TODO: Show error toast or alert
      return;
    }

    try {
      setIsSaving(true);
      const savedItem = await wardrobeService.createClothingItem(
        currentWardrobe.id,
        {
          ...itemData,
          wardrobe: { id: currentWardrobe.id }
        }
      );
      
      // Navigate back or show success message
      router.back();
    } catch (error) {
      console.error('Failed to save clothing item:', error);
      // TODO: Show error toast or alert
    } finally {
      setIsSaving(false);
    }
  };

  // Handle loading state
  if (loading && !isNewItem) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <WardrobeSelector />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={isDark ? 'white' : 'black'} />
          <ThemedText style={{ marginTop: 16 }}>Chargement en cours...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  // Handle error state
  if (error && !isNewItem) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <WardrobeSelector />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ThemedText style={{ color: '#FF0000', marginBottom: 16 }}>
            {error.message}
          </ThemedText>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ 
              backgroundColor: '#000', 
              padding: 12, 
              borderRadius: 8 
            }}
          >
            <ThemedText style={{ color: '#fff' }}>Retour</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Use newClothingItem for new items, clothingDetail for existing ones
  const itemToDisplay = isNewItem ? newClothingItem : clothingDetail;

  if (!itemToDisplay && !isNewItem) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <WardrobeSelector />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ThemedText style={{ marginBottom: 16 }}>
            Vêtement non trouvé
          </ThemedText>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ 
              backgroundColor: '#000', 
              padding: 12, 
              borderRadius: 8 
            }}
          >
            <ThemedText style={{ color: '#fff' }}>Retour</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <WardrobeSelector />
      
      {itemToDisplay && (
        <ClothingDetailView 
          imageUrl={itemToDisplay.imageUrl || ''}
          brand={itemToDisplay.name || ''}
          date={itemToDisplay.createdAt || ''}
          isDark={isDark}
          clothingDetail={itemToDisplay as ClothingItem}
          isNewItem={isNewItem}
          onSave={handleSave}
          isSubmitting={isSaving}
        />
      )}
    </SafeAreaView>
  );
}