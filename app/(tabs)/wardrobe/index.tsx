//POUR pour contenue dynamique
// Test 2 pout contenue dynamique

import { StyleSheet, View, ScrollView, SafeAreaView, ActivityIndicator,Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/wardrobe/wardrobeHome/Header';
import { TabSelector } from '@/components/wardrobe/wardrobeHome/TabSelector';
import { ClothingCard } from '@/components/wardrobe/wardrobeHome/ClothingCard';
import { EmptyState } from '@/components/wardrobe/wardrobeHome/EmptyState';
import { useWardrobeContent } from '@/hooks/wardrobe/useWardrobeContent';
import { ThemedText } from '@/components/ThemedText';


export default function WardrobeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const fetchClothingItems = useWardrobeContent();
  
  const {
    clothingItems,
    loading,
    error,
    activeTab,
    setActiveTab,
    totalItems,
    displayedCount,
  
  } = useWardrobeContent();


  if (loading) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.debugInfo}>
          <ThemedText>Chargement en cours...</ThemedText>
          <ThemedText>État: {loading ? 'Loading' : 'Ready'}</ThemedText>
        </View>
        <ActivityIndicator size="large" color={isDark ? 'white' : 'black'} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.debugInfo}>
          <ThemedText style={styles.errorText}>Erreur: {error.message}</ThemedText>
          <Pressable style={styles.retryButton}>
            <ThemedText>Réessayer</ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header onOptionsPress={() => {/* votre code */}} />
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      
      <View style={styles.debugInfo}>
        <ThemedText>Cette partie sera modifiée par la suite pour contenir les items sélectionnés.</ThemedText>
        <ThemedText></ThemedText>
        <ThemedText></ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.clothingGrid}>
        {clothingItems.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <ClothingCard
              id={item.id}  // Assurez-vous que ceci est passé
              imageUrl={{ uri: item.imageUrl }}
              brand={item.name}
              date={new Date(item.createdAt).toLocaleDateString()}
            />
          </View>
        ))}
        </View>
        <EmptyState
          count={displayedCount} 
          total={totalItems}
        />
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
    paddingHorizontal: 12,
  },
  clothingGrid: {
    paddingTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '32%',
    marginBottom: 8,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    padding: 20,
  },
  debugInfo: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
});