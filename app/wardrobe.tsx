import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Image,
  Modal,
  Alert
} from 'react-native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { Header } from '@/components/wardrobe/wardrobeHome/Header/Header';
import { TabSelector } from '@/components/wardrobe/wardrobeHome/Body/TabSelector';
import { ClothingCard } from '@/components/wardrobe/wardrobeHome/Body/ClothingCard';
import { EmptyState } from '@/components/wardrobe/wardrobeHome/Body/EmptyState';
import { useWardrobeContent } from '@/hooks/wardrobe/useWardrobeContent';
import { useCreateOutfit } from '@/hooks/wardrobe/Outfit/useCreateOutfit';
import { ThemedText } from '@/components/ThemedText';

export default function WardrobeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const { createOutfit, loading: creatingOutfit } = useCreateOutfit();

  const {
    clothingItems,
    loading,
    error,
    activeTab,
    setActiveTab,
    totalItems,
    displayedCount,
    isSelectionMode,
    setIsSelectionMode,
    selectedItems,
    toggleItemSelection
  } = useWardrobeContent();

  const handleOptionsPress = () => {
    // Action pour le bouton des trois points
  };

  const handleCheckPress = () => {
    setIsSelectionMode(!isSelectionMode);
  };

  const handleFilterPress = () => {
    // Action pour le bouton de filtre
  };

  const handleCreateOutfit = async () => {
    if (selectedItems.length === 0) return;

    try {
      const outfitData = {
        name: `Outfit du ${new Date().toLocaleDateString()}`,
        description: `Outfit créé avec ${selectedItems.length} items`,
        clothingItems: selectedItems
      };

      const newOutfit = await createOutfit(outfitData);

      if (newOutfit) {
        setShowOutfitModal(true);
      } else {
        Alert.alert(
            "Erreur",
            "Impossible de créer l'outfit. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error('Error in handleCreateOutfit:', error);
      Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de la création de l'outfit."
      );
    }
  };

  const handleCloseModal = () => {
    setShowOutfitModal(false);
    setIsSelectionMode(false);
  };

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

        <Header
            onOptionsPress={handleOptionsPress}
            onCheckPress={handleCheckPress}
            onFilterPress={handleFilterPress}
            isSelectionMode={isSelectionMode}
        />

        {isSelectionMode && selectedItems.length > 0 && (
            <View style={styles.selectionBar}>
              <View style={styles.selectedItemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.selectedItemsScroll}
                    contentContainerStyle={styles.selectedItemsScrollContent}
                >
                  {selectedItems.map((item) => (
                      <View key={item.id} style={styles.selectedItemThumb}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.thumbImage}
                            resizeMode="cover"
                        />
                      </View>
                  ))}
                </ScrollView>
                <ThemedText style={styles.selectionCount}>
                  {selectedItems.length} sélectionné(s)
                </ThemedText>
              </View>
              <Pressable
                  style={[styles.createOutfitButton, creatingOutfit && styles.createOutfitButtonDisabled]}
                  onPress={handleCreateOutfit}
                  disabled={creatingOutfit}
              >
                {creatingOutfit ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <ThemedText style={styles.createOutfitButtonText}>
                      Créer
                    </ThemedText>
                )}
              </Pressable>
            </View>
        )}

        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        <ScrollView style={styles.content}>
          <View style={styles.clothingGrid}>
            {clothingItems.map((item) => (
                <View key={item.id} style={styles.cardContainer}>
                  <ClothingCard
                      id={item.id}
                      imageUrl={{ uri: item.imageUrl }}
                      brand={item.name}
                      date={new Date(item.createdAt).toLocaleDateString()}
                      isSelectionMode={isSelectionMode}
                      isSelected={selectedItems.some(i => i.id === item.id)}
                      onSelect={() => toggleItemSelection(item)}
                  />
                </View>
            ))}
          </View>
          <EmptyState
              count={displayedCount}
              total={totalItems}
          />
        </ScrollView>

        <Modal
            animationType="slide"
            transparent={true}
            visible={showOutfitModal}
            onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>Outfit créé avec succès!</ThemedText>

              <ScrollView style={styles.modalItemsContainer}>
                <View style={styles.modalItemsGrid}>
                  {selectedItems.map((item) => (
                      <View key={item.id} style={styles.modalItemCard}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.modalItemImage}
                            resizeMode="cover"
                        />
                        <ThemedText style={styles.modalItemName}>{item.name}</ThemedText>
                      </View>
                  ))}
                </View>
              </ScrollView>

              <Pressable
                  style={styles.modalCloseButton}
                  onPress={handleCloseModal}
              >
                <ThemedText style={styles.modalCloseButtonText}>Fermer</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
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

  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedItemsContainer: {
    flex: 1,
    marginRight: 12,
  },
  selectedItemsScroll: {
    marginBottom: 8, // Ajoute de l'espace entre les images et le texte
  },
  selectedItemsScrollContent: {
    paddingHorizontal: 4,
  },
  selectionCount: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    color: '#666666',
  },

  selectedItemThumb: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  createOutfitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createOutfitButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItemsContainer: {
    width: '100%',
    maxHeight: '70%',
  },
  modalItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  modalItemCard: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  modalItemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalItemName: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  createOutfitButtonDisabled: {
    //backgroundColor: '#A9A9A9',
  },
});
