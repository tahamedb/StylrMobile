import { StyleSheet, View, ScrollView, SafeAreaView, ActivityIndicator, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/wardrobe/wardrobeHome/Header/Header';
import { TabSelector } from '@/components/wardrobe/wardrobeHome/Body/TabSelector';
import { ClothingCard } from '@/components/wardrobe/wardrobeHome/Body/ClothingCard';
import { OutfitCard } from '@/components/wardrobe/wardrobeHome/Body/OutfitCard';
import { EmptyState } from '@/components/wardrobe/wardrobeHome/Body/EmptyState';
import { WardrobeModal } from '@/components/wardrobe/WardrobeModal';
import { useWardrobeContent } from '@/hooks/wardrobe/useWardrobeContent';
import { useOutfits } from '@/hooks/profile/BodyModal/useOutfits';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState, useCallback } from 'react';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// The main screen component that handles the URL parameters and wardrobe selection
export default function WardrobeScreen() {
  const params = useLocalSearchParams();
  const wardrobeId = params.id ? Number(params.id) : null;
  const isSpecificWardrobe = params.isSpecificWardrobe === 'true';

  // Create a unique key that changes whenever the URL parameters change
  // This forces a complete remount of the wardrobe content
  const screenKey = `wardrobe-${isSpecificWardrobe}-${wardrobeId || 'all'}`;

  return (
    <WardrobeScreenContent key={screenKey} wardrobeId={wardrobeId} isSpecificWardrobe={isSpecificWardrobe} />
  );
}

// Separate component that gets remounted whenever the URL parameters change
function WardrobeScreenContent({ 
  wardrobeId, 
  isSpecificWardrobe 
}: { 
  wardrobeId: number | null;
  isSpecificWardrobe: boolean;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { setCurrentWardrobe, wardrobes, clearCurrentWardrobe } = useWardrobe();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Set up the wardrobe when this component mounts
  useEffect(() => {
    console.log('Setting up wardrobe with:', { wardrobeId, isSpecificWardrobe });
    
    if (isSpecificWardrobe && wardrobeId) {
      const wardrobe = wardrobes.find(w => w.id === wardrobeId);
      if (wardrobe) {
        console.log('Found wardrobe:', wardrobe.name);
        setCurrentWardrobe(wardrobe);
      } else {
        console.log('Wardrobe not found, navigating back');
        router.back();
      }
    } else {
      console.log('Setting up all clothes view');
      clearCurrentWardrobe();
    }

    // Clean up when unmounting
    return () => {
      console.log('Cleaning up wardrobe screen');
      clearCurrentWardrobe();
    };
  }, []);  // Empty deps array since this should only run once when mounted

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen options={{ headerShown: false }} />
      <WardrobeContent isDark={isDark} />
      <WardrobeModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </SafeAreaView>
  );
}

// Content component that handles the actual display
function WardrobeContent({ isDark }: { isDark: boolean }) {
  const {
    clothingItems,
    loading: itemsLoading,
    error: itemsError,
    activeTab,
    setActiveTab,
    totalItems,
    displayedCount,
    refetch,
  } = useWardrobeContent();

  const {
    outfitsData,
    isLoading: outfitsLoading,
    error: outfitsError,
  } = useOutfits();

  const loading = itemsLoading || outfitsLoading;
  const error = itemsError || outfitsError;

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? 'white' : 'black'} />
        <ThemedText style={styles.loadingText}>Chargement en cours...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          {error instanceof Error ? error.message : error}
        </ThemedText>
        <Pressable style={styles.retryButton} onPress={handleRetry}>
          <ThemedText style={styles.retryText}>Réessayer</ThemedText>
        </Pressable>
      </View>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tous':
        return (
          <View style={styles.grid}>
            {clothingItems.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <ClothingCard
                  id={item.id}
                  imageUrl={{ uri: item.imageUrl || '' }}
                  brand={item.name || ''}
                  date={new Date(item.createdAt || '').toLocaleDateString('fr-FR')}
                />
              </View>
            ))}
            {clothingItems.length === 0 && (
              <View style={styles.emptyItem}>
                <ThemedText style={styles.emptyText}>Aucun vêtement trouvé</ThemedText>
                <ThemedText style={styles.emptySubText}>Ajoutez des vêtements à votre garde-robe</ThemedText>
              </View>
            )}
          </View>
        );
      case 'tenues':
        return (
          <View style={styles.outfitsGrid}>
            {outfitsData.map((outfit) => (
              <View key={outfit.id} style={styles.outfitCard}>
                <OutfitCard outfit={outfit} />
              </View>
            ))}
            {outfitsData.length === 0 && (
              <EmptyState
                count={0}
                total={0}
                message="Aucune tenue trouvée"
                subMessage="Créez votre première tenue"
              />
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header onOptionsPress={() => {/* votre code */}} />
      <View style={styles.headerActions}>
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
      
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </>
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
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 8,
  },
  gridItem: {
    width: '48%', // slightly less than 50% to account for gap
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  emptyItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
  },
  outfitsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  outfitCard: {
    width: '47%',
  },
});