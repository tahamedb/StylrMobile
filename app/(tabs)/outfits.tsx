import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Platform,
  Animated,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useOutfits } from '@/hooks/profile/BodyModal/useOutfits';
import { Outfit } from '@/types/api.types';
import { Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { ItemSelectionModal } from '@/components/wardrobe/ItemSelectionModal';
import { ClothingItem } from '@/types/api.types';
import { Picker } from '@react-native-picker/picker';
import { OutfitSlot, SLOT_CONFIG, OutfitSelection } from '@/types/outfit.types';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const SEASONS = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];
const OCCASIONS = ['All', 'Casual', 'Formal', 'Business', 'Sport', 'Party'];

export default function OutfitsScreen() {
  const router = useRouter();
  const { outfitsData, isLoading, error, refetch, createOutfit } = useOutfits();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<OutfitSlot | null>(null);
  const [outfitItems, setOutfitItems] = useState<OutfitSelection>({});
  const [outfitName, setOutfitName] = useState('');
  const [description, setDescription] = useState('');
  const [season, setSeason] = useState(SEASONS[0]);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const { currentWardrobe, wardrobes, setCurrentWardrobe } = useWardrobe();
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const [isSaving, setIsSaving] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [tempSelectedWardrobe, setTempSelectedWardrobe] = useState<number | null>(null);
  const [createWardrobe, setCreateWardrobe] = useState(currentWardrobe);
  const [isCreatePickerVisible, setIsCreatePickerVisible] = useState(false);
  const [tempCreateWardrobe, setTempCreateWardrobe] = useState<number | null>(null);
  const [isViewPickerVisible, setIsViewPickerVisible] = useState(false);
  const [tempViewWardrobe, setTempViewWardrobe] = useState<number | null>(null);
  const [recommendedOutfits, setRecommendedOutfits] = useState<Outfit[]>([]);
  const [popularOutfits, setPopularOutfits] = useState<Outfit[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  useEffect(() => {
    Animated.spring(slideUpAnim, {
      toValue: isCreating ? 1 : 0,
      useNativeDriver: true,
      tension: 20,
      friction: 7,
    }).start();
  }, [isCreating]);

  // Load outfits immediately when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      setRefreshing(true);
      try {
        await refetch();
      } finally {
        setRefreshing(false);
      }
    };
    loadInitialData();
  }, []);

  // Refresh outfits when screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  // Load outfits when wardrobe changes
  useEffect(() => {
    if (currentWardrobe?.id) {
      refetch();
    }
  }, [currentWardrobe?.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleCreatePress = () => {
    setIsCreating(true);
  };

  const handleClose = () => {
    setIsCreating(false);
    // Reset form
    setOutfitItems({});
    setOutfitName('');
    setDescription('');
    setSeason(SEASONS[0]);
    setOccasion(OCCASIONS[0]);
  };

  const handleSave = async () => {
    if (!currentWardrobe?.id || isSaving) return;

    if (!outfitName.trim()) {
      Alert.alert('Error', 'Please enter a name for your outfit');
      return;
    }

    try {
      setIsSaving(true);
      
      const outfitData = {
        name: outfitName.trim(),
        description: description.trim(),
        season,
        occasion,
        tags: [],
        wardrobe: { id: currentWardrobe.id },
        top: outfitItems.top ? { id: outfitItems.top.id } : undefined,
        bottom: outfitItems.bottom ? { id: outfitItems.bottom.id } : undefined,
        dress: outfitItems.dress ? { id: outfitItems.dress.id } : undefined,
        outerwear: outfitItems.outerwear ? { id: outfitItems.outerwear.id } : undefined,
        shoes: outfitItems.shoes ? { id: outfitItems.shoes.id } : undefined,
      };

      await createOutfit(outfitData);
      handleClose();
      refetch();
      Alert.alert('Success', 'Outfit created successfully');
    } catch (error) {
      console.error('Error saving outfit:', error);
      Alert.alert('Error', 'Failed to save outfit');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOutfitPress = (outfit: Outfit) => {
    router.push({
      pathname: '/outfit-detail',
      params: { id: outfit.id }
    });
  };

  const filteredOutfits = outfitsData.filter(outfit => {
    const matchesSeason = selectedSeason === 'All' || outfit.season === selectedSeason;
    const matchesOccasion = selectedOccasion === 'All' || outfit.occasion === selectedOccasion;
    return matchesSeason && matchesOccasion;
  });

  const renderOutfitCard = (outfit: Outfit) => (
    <TouchableOpacity
      key={outfit.id}
      style={styles.outfitCard}
      onPress={() => handleOutfitPress(outfit)}
    >
      <View style={styles.cardImageContainer}>
        {outfit.imageUrl ? (
          <Image
            source={{ uri: outfit.imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="shirt-outline" size={32} color="#666" />
          </View>
        )}
        <BlurView intensity={80} style={styles.cardOverlay}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {outfit.name}
          </Text>
          <Text style={styles.cardSubtitle}>
            {outfit.occasion} • {outfit.season}
          </Text>
        </BlurView>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChips = () => (
    <View style={styles.filtersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {SEASONS.map(season => (
          <TouchableOpacity
            key={season}
            style={[
              styles.filterChip,
              selectedSeason === season && styles.filterChipSelected
            ]}
            onPress={() => setSelectedSeason(season)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedSeason === season && styles.filterChipTextSelected
              ]}
            >
              {season}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.occasionFilters}
      >
        {OCCASIONS.map(occasion => (
          <TouchableOpacity
            key={occasion}
            style={[
              styles.filterChip,
              selectedOccasion === occasion && styles.filterChipSelected
            ]}
            onPress={() => setSelectedOccasion(occasion)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedOccasion === occasion && styles.filterChipTextSelected
              ]}
            >
              {occasion}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const handleWardrobeChange = (wardrobeId: number) => {
    const wardrobe = wardrobes.find(w => w.id === wardrobeId);
    if (wardrobe) {
      setCurrentWardrobe(wardrobe);
    }
  };

  const openPicker = () => {
    setTempSelectedWardrobe(currentWardrobe?.id || null);
    setIsPickerVisible(true);
  };

  const closePicker = () => {
    setIsPickerVisible(false);
  };

  const confirmWardrobeSelection = () => {
    if (tempSelectedWardrobe) {
      handleWardrobeChange(tempSelectedWardrobe);
    }
    closePicker();
  };

  const openViewPicker = () => {
    setTempViewWardrobe(currentWardrobe?.id || null);
    setIsViewPickerVisible(true);
  };

  const closeViewPicker = () => {
    setIsViewPickerVisible(false);
  };

  const openCreatePicker = () => {
    setTempCreateWardrobe(createWardrobe?.id || null);
    setIsCreatePickerVisible(true);
  };

  const closeCreatePicker = () => {
    setIsCreatePickerVisible(false);
  };

  const handleViewWardrobeChange = (wardrobeId: number) => {
    const wardrobe = wardrobes.find(w => w.id === wardrobeId);
    if (wardrobe) {
      setCurrentWardrobe(wardrobe);
    }
  };

  const handleCreateWardrobeChange = (wardrobeId: number) => {
    const wardrobe = wardrobes.find(w => w.id === wardrobeId);
    if (wardrobe) {
      setCreateWardrobe(wardrobe);
    }
  };

  const renderViewWardrobeSelector = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={currentWardrobe?.id}
            onValueChange={(itemValue) => handleViewWardrobeChange(Number(itemValue))}
            style={styles.picker}
            dropdownIconColor="#fff"
            itemStyle={{ color: '#fff' }}
          >
            {wardrobes.map(wardrobe => (
              <Picker.Item 
                key={wardrobe.id} 
                label={wardrobe.name} 
                value={wardrobe.id}
                color="#fff"
              />
            ))}
          </Picker>
        </View>
      );
    }

    return (
      <View>
        <TouchableOpacity 
          style={styles.androidPickerButton} 
          onPress={openViewPicker}
        >
          <Text style={styles.androidPickerText}>
            {currentWardrobe?.name || 'Select Wardrobe'}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>

        <Modal
          visible={isViewPickerVisible}
          transparent
          animationType="slide"
          onRequestClose={closeViewPicker}
        >
          <TouchableOpacity 
            style={[styles.modalOverlay, { justifyContent: 'flex-end' }]} 
            activeOpacity={1} 
            onPress={closeViewPicker}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              style={[styles.modalContent, { width: '100%' }]}
              onPress={e => e.stopPropagation()}
            >
              <View style={[styles.modalHeader, { padding: 16 }]}>
                <Text style={[styles.modalTitle, { fontSize: 18 }]}>Select Wardrobe</Text>
                <TouchableOpacity 
                  style={[styles.modalCloseButton, { 
                    padding: 8,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }]}
                  onPress={closeViewPicker}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScroll}>
                {wardrobes.map(wardrobe => (
                  <TouchableOpacity
                    key={wardrobe.id}
                    style={[
                      styles.wardrobeOption,
                      tempViewWardrobe === wardrobe.id && styles.wardrobeOptionSelected
                    ]}
                    onPress={() => {
                      setTempViewWardrobe(wardrobe.id);
                      handleViewWardrobeChange(wardrobe.id);
                      closeViewPicker();
                    }}
                  >
                    <Text style={[
                      styles.wardrobeOptionText,
                      tempViewWardrobe === wardrobe.id && styles.wardrobeOptionTextSelected
                    ]}>
                      {wardrobe.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const renderCreateWardrobeSelector = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.selectorContainer}>
          <Text style={styles.sectionTitle}>Select Wardrobe</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={createWardrobe?.id}
              onValueChange={(itemValue) => handleCreateWardrobeChange(Number(itemValue))}
              style={styles.picker}
              dropdownIconColor="#fff"
              itemStyle={{ color: '#fff' }}
            >
              {wardrobes.map(wardrobe => (
                <Picker.Item 
                  key={wardrobe.id} 
                  label={wardrobe.name} 
                  value={wardrobe.id}
                  color="#fff"
                />
              ))}
            </Picker>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.sectionTitle}>Select Wardrobe</Text>
        <TouchableOpacity 
          style={styles.androidPickerButton} 
          onPress={openCreatePicker}
        >
          <Text style={styles.androidPickerText}>
            {createWardrobe?.name || 'Select Wardrobe'}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>

        <Modal
          visible={isCreatePickerVisible}
          transparent
          animationType="slide"
          onRequestClose={closeCreatePicker}
        >
          <TouchableOpacity 
            style={[styles.modalOverlay, { justifyContent: 'flex-end' }]} 
            activeOpacity={1} 
            onPress={closeCreatePicker}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              style={[styles.modalContent, { width: '100%' }]}
              onPress={e => e.stopPropagation()}
            >
              <View style={[styles.modalHeader, { padding: 16 }]}>
                <Text style={[styles.modalTitle, { fontSize: 18 }]}>Select Wardrobe</Text>
                <TouchableOpacity 
                  style={[styles.modalCloseButton, { 
                    padding: 8,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }]}
                  onPress={closeCreatePicker}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScroll}>
                {wardrobes.map(wardrobe => (
                  <TouchableOpacity
                    key={wardrobe.id}
                    style={[
                      styles.wardrobeOption,
                      tempCreateWardrobe === wardrobe.id && styles.wardrobeOptionSelected
                    ]}
                    onPress={() => {
                      setTempCreateWardrobe(wardrobe.id);
                      handleCreateWardrobeChange(wardrobe.id);
                      closeCreatePicker();
                    }}
                  >
                    <Text style={[
                      styles.wardrobeOptionText,
                      tempCreateWardrobe === wardrobe.id && styles.wardrobeOptionTextSelected
                    ]}>
                      {wardrobe.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const renderMainHeader = () => (
    <View style={styles.mainHeader}>
      <Text style={styles.title}>My Outfits</Text>
      {renderViewWardrobeSelector()}
    </View>
  );

  const renderCreatePanel = () => (
    <Animated.View 
      style={[
        styles.createPanel,
        {
          transform: [{
            translateY: slideUpAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [800, 0]
            })
          }]
        }
      ]}
    >
      <BlurView intensity={100} style={styles.createContent}>
        <View style={styles.createHeader}>
          <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.createTitle}>Create Outfit</Text>
          <TouchableOpacity 
            onPress={handleSave}
            disabled={isSaving}
            style={[styles.headerButton, isSaving && styles.headerButtonDisabled]}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.createScroll}>
          {renderCreateWardrobeSelector()}

          <TextInput
            style={styles.input}
            value={outfitName}
            onChangeText={setOutfitName}
            placeholder="Name your outfit"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Add a description"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            multiline
            numberOfLines={3}
          />

          <View style={styles.seasonOccasionContainer}>
            <Text style={styles.sectionTitle}>Season</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {SEASONS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, season === s && styles.chipSelected]}
                  onPress={() => setSeason(s)}
                >
                  <Text style={[styles.chipText, season === s && styles.chipTextSelected]}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Occasion</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {OCCASIONS.map(o => (
                <TouchableOpacity
                  key={o}
                  style={[styles.chip, occasion === o && styles.chipSelected]}
                  onPress={() => setOccasion(o)}
                >
                  <Text style={[styles.chipText, occasion === o && styles.chipTextSelected]}>
                    {o}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.gridContainer}>
            <Text style={styles.sectionTitle}>Select Items</Text>
            <View style={styles.grid}>
              {Object.keys(SLOT_CONFIG).map((slot) => (
                renderPlaceholder(slot as OutfitSlot)
              ))}
            </View>
          </View>
        </ScrollView>
      </BlurView>
    </Animated.View>
  );

  const handleSelectItem = (item: ClothingItem) => {
    if (!selectedSlot) return;
    setOutfitItems((prev: OutfitSelection) => ({
      ...prev,
      [selectedSlot]: item
    }));
    setSelectedSlot(null);
  };

  const renderPlaceholder = (slot: OutfitSlot) => {
    const config = SLOT_CONFIG[slot];
    const selectedItem = outfitItems[slot] as ClothingItem;

    return (
      <TouchableOpacity 
        key={slot}
        style={styles.placeholder}
        onPress={() => setSelectedSlot(slot)}
      >
        {selectedItem ? (
          <View style={styles.previewItem}>
            <Image 
              source={{ uri: selectedItem.imageUrl }} 
              style={styles.previewImage}
              resizeMode="cover"
            />
            <BlurView intensity={80} style={styles.previewLabel}>
              <Text style={styles.previewText}>{selectedItem.name}</Text>
            </BlurView>
          </View>
        ) : (
          <View style={styles.emptyItem}>
            <Ionicons name={config.icon} size={32} color="#666" />
            <Text style={styles.placeholderLabel}>{config.label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const fetchRecommendations = async () => {
    if (!currentWardrobe?.id) {
      console.log('No wardrobe selected for recommendations');
      return;
    }
    
    console.log('Fetching recommendations for wardrobe:', currentWardrobe.id);
    console.log('Filters:', { season: selectedSeason, occasion: selectedOccasion });
    
    setIsLoadingRecommendations(true);
    try {
      const [recommended, popular] = await Promise.all([
        wardrobeService.getRecommendedOutfits(
          currentWardrobe.id,
          selectedSeason === 'All' ? undefined : selectedSeason, 
          selectedOccasion === 'All' ? undefined : selectedOccasion
        ),
        wardrobeService.getPopularOutfits(currentWardrobe.id)
      ]);
      console.log('Received recommendations:', { recommended, popular });
      setRecommendedOutfits(recommended || []);
      setPopularOutfits(popular || []);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [currentWardrobe?.id, selectedSeason, selectedOccasion]);

  const renderRecommendations = () => {
    if (isLoadingRecommendations) {
      return (
        <View style={styles.recommendationsLoading}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      );
    }

    return (
      <>
        {recommendedOutfits.length > 0 && (
          <View style={styles.recommendationSection}>
            <Text style={styles.recommendationTitle}>Recommended for You</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.recommendationScroll}
            >
              {recommendedOutfits.map(outfit => (
                <TouchableOpacity
                  key={outfit.id}
                  style={styles.recommendationCard}
                  onPress={() => handleOutfitPress(outfit)}
                >
                  {outfit.imageUrl ? (
                    <Image
                      source={{ uri: outfit.imageUrl }}
                      style={styles.recommendationImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.recommendationPlaceholder}>
                      <Ionicons name="shirt-outline" size={24} color="#666" />
                    </View>
                  )}
                  <BlurView intensity={80} style={styles.recommendationOverlay}>
                    <Text style={styles.recommendationName} numberOfLines={1}>
                      {outfit.name}
                    </Text>
                    <Text style={styles.recommendationDetail}>
                      {outfit.occasion} • {outfit.season}
                    </Text>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {popularOutfits.length > 0 && (
          <View style={styles.recommendationSection}>
            <Text style={styles.recommendationTitle}>Popular Outfits</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.recommendationScroll}
            >
              {popularOutfits.map(outfit => (
                <TouchableOpacity
                  key={outfit.id}
                  style={styles.recommendationCard}
                  onPress={() => handleOutfitPress(outfit)}
                >
                  {outfit.imageUrl ? (
                    <Image
                      source={{ uri: outfit.imageUrl }}
                      style={styles.recommendationImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.recommendationPlaceholder}>
                      <Ionicons name="shirt-outline" size={24} color="#666" />
                    </View>
                  )}
                  <BlurView intensity={80} style={styles.recommendationOverlay}>
                    <Text style={styles.recommendationName} numberOfLines={1}>
                      {outfit.name}
                    </Text>
                    <Text style={styles.recommendationDetail}>
                      Rating: {outfit.rating?.toFixed(1)} • Worn: {outfit.timesWorn}
                    </Text>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </>
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff3b30" />
          <Text style={styles.errorText}>Failed to load outfits</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={StyleSheet.absoluteFill}
      />
      
      {renderMainHeader()}
      {renderFilterChips()}

      {isLoading || refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading outfits...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#fff"
            />
          }
        >
          {renderRecommendations()}
          {filteredOutfits.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="shirt-outline" size={48} color="#666" />
              <Text style={styles.emptyText}>No outfits found</Text>
              <TouchableOpacity
                style={styles.createFirstButton}
                onPress={handleCreatePress}
              >
                <Text style={styles.createFirstButtonText}>
                  Create your first outfit
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.grid}>
              {filteredOutfits.map(renderOutfitCard)}
            </View>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreatePress}
      >
        <LinearGradient
          colors={['#fff', '#f0f0f0']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={24} color="#000" />
        </LinearGradient>
      </TouchableOpacity>

      {renderCreatePanel()}

      {selectedSlot && (
        <ItemSelectionModal
          category={SLOT_CONFIG[selectedSlot].category}
          onSelect={handleSelectItem}
          onClose={() => setSelectedSlot(null)}
          visible={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  occasionFilters: {
    marginTop: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#4CAF50',
  },
  filterChipText: {
    color: '#fff',
    fontSize: 14,
  },
  filterChipTextSelected: {
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  outfitCard: {
    width: ITEM_WIDTH,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImageContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    minHeight: 300,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  createFirstButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  createFirstButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90%',
    backgroundColor: 'transparent',
  },
  createContent: {
    flex: 1,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  createHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#111',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerButtonDisabled: {
    opacity: 0.5,
  },
  createTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createScroll: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    color: '#fff',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  seasonOccasionContainer: {
    marginBottom: 24,
  },
  gridContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  placeholder: {
    width: ITEM_WIDTH,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewItem: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  previewLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  previewText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#fff',
  },
  selectorContainer: {
    marginBottom: 24,
  },
  pickerWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  picker: {
    color: '#fff',
    ...(Platform.OS === 'ios' ? {
      height: 150,
    } : {
      backgroundColor: 'transparent',
      width: '100%',
      height: 50,
    }),
  } as const,
  pickerItem: {
    color: Platform.OS === 'ios' ? '#000' : '#fff',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#fff',
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#000',
    fontWeight: '600',
  },
  mainHeader: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    marginTop: Platform.OS === 'ios' ? 20 : 30,
  },
  androidPickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  androidPickerText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalScroll: {
    padding: 16,
  },
  wardrobeOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  wardrobeOptionSelected: {
    backgroundColor: '#4CAF50',
  },
  wardrobeOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  wardrobeOptionTextSelected: {
    fontWeight: '600',
  },
  recommendationSection: {
    marginBottom: 24,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  recommendationScroll: {
    paddingHorizontal: 16,
  },
  recommendationCard: {
    width: 160,
    height: 200,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
  recommendationPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  recommendationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  recommendationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  recommendationDetail: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  recommendationsLoading: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 