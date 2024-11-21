import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/wardrobe/Header';
import { TabSelector } from '@/components/wardrobe/TabSelector';
import { ClothingCard } from '@/components/wardrobe/ClothingCard';
import { EmptyState } from '@/components/wardrobe/EmptyState';
import { useWardrobeContent } from '@/hooks/wardrobe/useWardrobeContent';

export default function WardrobeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const {
    activeTab,
    setActiveTab,
    showOptions,
    setShowOptions,
    clothingData,
    showEmptyState
  } = useWardrobeContent();
  

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header onOptionsPress={() => setShowOptions(true)} />
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      
      <ScrollView style={styles.content}>
        <View style={styles.clothingGrid}>
          <ClothingCard {...clothingData} />
        </View>
        {showEmptyState && <EmptyState />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  clothingGrid: {
    paddingTop: 16,
  },
});