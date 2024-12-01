/*import { SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ClothingDetailView } from '@/components/wardrobe/clothingDetail/ClothingDetailView';

export default function ClothingDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const params = useLocalSearchParams();
  const { imageUrl, brand, date } = params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ClothingDetailView 
        imageUrl={imageUrl as string}
        brand={brand as string}
        date={date as string}
        isDark={isDark}
      />

    </SafeAreaView>
  );
}
  */

import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ClothingDetailView } from '@/components/wardrobe/clothingDetail/ClothingDetailView';
import { useClothingDetail } from '@/hooks/wardrobe/useClothingDetail';
import { ThemedText } from '@/components/ThemedText';

export default function ClothingDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const params = useLocalSearchParams();
  //const { id } = params;

  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : undefined;
  console.log('Parsed ID:', id);

  const { clothingDetail, loading, error } = useClothingDetail(id || 0);

  //const {
    //clothingDetail,
    //loading,
    //error
  // } = useClothingDetail(Number(id));

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={isDark ? 'white' : 'black'} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ThemedText>Erreur: {error.message}</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (!clothingDetail) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ClothingDetailView 
        imageUrl={clothingDetail.imageUrl}
        brand={clothingDetail.name}
        date={clothingDetail.createdAt}
        isDark={isDark}
      />
    
    </SafeAreaView>
  );
}