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
import { Outfit, ClothingItem } from '@/types/api.types';
import { Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { ItemSelectionModal } from '@/components/wardrobe/ItemSelectionModal';
import { OutfitSlot, SLOT_CONFIG, OutfitSelection } from '@/types/outfit.types';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const SEASONS = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];
const OCCASIONS = ['All', 'Casual', 'Formal', 'Business', 'Sport', 'Party'];

const TABS = ['All', 'Recommended'] as const;
type TabType = typeof TABS[number];

// Define the RecommendedOutfit type that extends Outfit
interface RecommendedOutfit extends Outfit {
  items?: Array<{
    id: number;
    category: string;
    name: string;
  }>;
}

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
  const [recommendedOutfits, setRecommendedOutfits] = useState<RecommendedOutfit[]>([]);
  const [popularOutfits, setPopularOutfits] = useState<Outfit[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('All');

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
            dropdownIconColor="#11181C"
          >
            {wardrobes.map(wardrobe => (
              <Picker.Item 
                key={wardrobe.id} 
                label={wardrobe.name} 
                value={wardrobe.id}
                color="#11181C"
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
          <Ionicons name="chevron-down" size={24} color="#11181C" />
        </TouchableOpacity>

        <Modal
          visible={isViewPickerVisible}
          transparent
          animationType="slide"
          onRequestClose={closeViewPicker}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1} 
            onPress={closeViewPicker}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              style={styles.modalContent}
              onPress={e => e.stopPropagation()}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Wardrobe</Text>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={closeViewPicker}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={24} color="#11181C" />
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

  // Add this effect to load recommendations when tab changes
  useEffect(() => {
    if (activeTab === 'Recommended' && currentWardrobe?.id) {
      loadRecommendations();
    }
  }, [activeTab, currentWardrobe?.id]);

  const loadRecommendations = async () => {
    if (!currentWardrobe?.id) return;
    
    setIsLoadingRecommendations(true);
    try {
      // Generate fake recommendations based on the wardrobe's items
      const fakeRecommendations: RecommendedOutfit[] = [
        {
          id: 1001,
          name: 'Casual Summer Day',
          description: 'Perfect for a sunny day out',
          season: 'Summer',
          occasion: 'Casual',
          imageUrl: undefined,
          rating: 4.5,
          timesWorn: 0,
          tags: [],
          wardrobe: { id: currentWardrobe.id },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: [
            { id: 1, category: 'top', name: 'White Cotton T-Shirt' },
            { id: 2, category: 'bottom', name: 'Light Blue Jeans' },
            { id: 3, category: 'shoes', name: 'White Sneakers' }
          ]
        },
        {
          id: 1002,
          name: 'Business Meeting',
          description: 'Professional and polished look',
          season: selectedSeason === 'All' ? 'Spring' : selectedSeason,
          occasion: 'Business',
          imageUrl: undefined,
          rating: 4.8,
          timesWorn: 0,
          tags: [],
          wardrobe: { id: currentWardrobe.id },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: [
            { id: 4, category: 'top', name: 'Navy Blazer' },
            { id: 5, category: 'bottom', name: 'Gray Dress Pants' },
            { id: 6, category: 'shoes', name: 'Black Oxford Shoes' }
          ]
        },
        {
          id: 1003,
          name: 'Weekend Brunch',
          description: 'Stylish and comfortable',
          season: selectedSeason === 'All' ? 'Fall' : selectedSeason,
          occasion: 'Casual',
          imageUrl: undefined,
          rating: 4.2,
          timesWorn: 0,
          tags: [],
          wardrobe: { id: currentWardrobe.id },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: [
            { id: 7, category: 'top', name: 'Striped Sweater' },
            { id: 8, category: 'bottom', name: 'Black Jeans' },
            { id: 9, category: 'shoes', name: 'Leather Boots' }
          ]
        }
      ];

      setRecommendedOutfits(fakeRecommendations);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const renderRecommendedOutfitCard = (outfit: RecommendedOutfit) => (
    <TouchableOpacity
      key={outfit.id}
      style={styles.outfitCard}
      onPress={() => handleOutfitPress(outfit)}
    >
      <View style={styles.cardImageContainer}>
        <View style={styles.recommendedPlaceholder}>
          {outfit.items?.map((item) => (
            <Text key={item.id} style={styles.recommendedItemText}>
              • {item.name}
            </Text>
          ))}
        </View>
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

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.tabSelected
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.tabTextSelected
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
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
      
      {renderMainHeader()}
      {renderTabs()}
      {renderFilterChips()}

      {isLoading || refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
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
              tintColor="#0a7ea4"
            />
          }
        >
          {activeTab === 'Recommended' ? (
            isLoadingRecommendations ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0a7ea4" />
                <Text style={styles.loadingText}>Generating recommendations...</Text>
              </View>
            ) : recommendedOutfits.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="shirt-outline" size={48} color="#687076" />
                <Text style={styles.emptyText}>No recommendations available</Text>
                <Text style={styles.emptySubtext}>
                  Add more items to your wardrobe to get personalized recommendations
                </Text>
              </View>
            ) : (
              <View style={styles.grid}>
                {recommendedOutfits.map(outfit => renderRecommendedOutfitCard(outfit))}
              </View>
            )
          ) : (
            <View style={styles.grid}>
              {filteredOutfits.map(outfit => renderOutfitCard(outfit))}
            </View>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreatePress}
      >
        <View style={styles.fabGradient}>
          <Ionicons name="add" size={24} color="#fff" />
        </View>
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
    backgroundColor: '#fff',
  },
  mainHeader: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  occasionFilters: {
    marginTop: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#0a7ea4',
  },
  filterChipText: {
    color: '#687076',
    fontSize: 14,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  outfitCard: {
    width: ITEM_WIDTH,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F1F3F5',
  },
  cardImageContainer: {
    flex: 1,
    backgroundColor: '#F1F3F5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#687076',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#11181C',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#11181C',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#0a7ea4',
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
    backgroundColor: '#fff',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#11181C',
    textAlign: 'center',
  },
  createFirstButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#0a7ea4',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
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
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  picker: {
    color: '#11181C',
    ...(Platform.OS === 'ios' ? {
      height: 150,
    } : {
      backgroundColor: 'transparent',
      width: '100%',
      height: 50,
    }),
  },
  androidPickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
    padding: 12,
  },
  androidPickerText: {
    color: '#11181C',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
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
    borderBottomColor: '#F1F3F5',
  },
  modalTitle: {
    color: '#11181C',
    fontSize: 18,
    fontWeight: '600',
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
  },
  modalScroll: {
    padding: 16,
  },
  wardrobeOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F1F3F5',
  },
  wardrobeOptionSelected: {
    backgroundColor: '#0a7ea4',
  },
  wardrobeOptionText: {
    color: '#11181C',
    fontSize: 16,
  },
  wardrobeOptionTextSelected: {
    color: '#fff',
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F1F3F5',
  },
  tabSelected: {
    backgroundColor: '#0a7ea4',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#687076',
  },
  tabTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#687076',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  recommendedPlaceholder: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: '#F1F3F5',
  },
  recommendedItemText: {
    fontSize: 14,
    color: '#11181C',
    marginBottom: 4,
  },
}); 