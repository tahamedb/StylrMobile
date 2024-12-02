import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, View, TextInput, Platform, Modal } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native';
import { ClothingItem, DropdownModalProps } from '@/types/clothes.types';
import { uploadImageToCloudinary } from '@/services/Cloudinary/CloudinaryServices';

const CLOTHING_OPTIONS = {
  category: [
    'Tops > T-shirts',
    'Tops > Long Sleeve T-shirts',
    'Tops > Sweaters',
    'Bottoms > Pants',
    'Bottoms > Shorts',
    'Outerwear > Jackets',
    'Outerwear > Coats',
  ],
  style: ['Casual', 'Formal', 'Sporty', 'Business', 'Vintage', 'Streetwear'],
  pattern: ['Solid', 'Striped', 'Graphic', 'Floral', 'Plaid', 'Checkered'],
  material: ['Cotton', 'Polyester', 'Wool', 'Denim', 'Linen', 'Silk'],
  fit: ['Slim', 'Regular', 'Loose', 'Oversized'],
  length: ['Cropped', 'Regular', 'Long', 'Extra Long'],
  neckline: ['Crew Neck', 'V-Neck', 'Turtleneck', 'Scoop Neck', 'Collar'],
  sleeveLength: ['Sleeveless', 'Short Sleeve', 'Long Sleeve', '3/4 Sleeve'],
  colors: ['Black', 'White', 'Navy', 'Gray', 'Beige', 'Brown', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink'],
}




export default function ClothesDetailsScreen() {
  const params = useLocalSearchParams();
  const imageBase64 = params.imageBase64 as string;
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  const [activeTab, setActiveTab] = useState('Information');
  const [isLoading, setIsLoading] = useState(false);
  const [clothingItem, setClothingItem] = useState<ClothingItem>({
    category: 'Tops > T-shirts',
    style: 'Casual',
    pattern: 'Solid',
    material: 'Cotton',
    fit: 'Regular',
    length: 'Regular',
    neckline: 'Crew Neck',
    sleeveLength: 'Short Sleeve',
    brand: '',
    colors: [],
    seasons: [],
    occasions: [],
  });

  const occasions = ['Casual', 'Formal', 'Daily', 'Work', 'Sport', 'Party'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeField, setActiveField] = useState<keyof ClothingItem | null>(null);

  const handleItemChange = (field: keyof ClothingItem, value: string) => {
    setClothingItem(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof ClothingItem, item: string) => {
    setClothingItem(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(item)
        ? (prev[field] as string[]).filter(i => i !== item)
        : [...(prev[field] as string[]), item]
    }));
  };

  const renderDropdown = (
    label: string,
    field: keyof ClothingItem,
    options: string[]
  ) => (
    <View style={styles.infoRow}>
      <ThemedText>{label}</ThemedText>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => {
          setActiveField(field);
          setDropdownVisible(true);
        }}
      >
        <ThemedText style={styles.blueText}>
          {clothingItem[field]}
        </ThemedText>
        <IconSymbol name="chevron.down" size={16} color={iconColor} />
      </TouchableOpacity>
    </View>
  );

  const DropdownModal = ({ visible, onClose, options = [], onSelect, selectedValue }: DropdownModalProps) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <ScrollView>
            {Array.isArray(options) && options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.dropdownItem,
                  selectedValue === option && styles.selectedDropdownItem
                ]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <ThemedText style={selectedValue === option ? styles.selectedDropdownText : styles.dropdownText}>
                  {option}
                </ThemedText>
                {option === selectedValue && (
                  <IconSymbol name="checkmark" size={20} color="#0a7ea4" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  useEffect(() => {
    if (dropdownVisible && activeField) {
      const options = activeField === 'colors'
        ? CLOTHING_OPTIONS.colors
        : CLOTHING_OPTIONS[activeField as keyof typeof CLOTHING_OPTIONS] || [];
    }
  }, [dropdownVisible, activeField]);

  const handleImageUpload = async () => {
    if (imageBase64) {
      try {
        setIsLoading(true);
        const imageUrl = await uploadImageToCloudinary(imageBase64);
        console.log('Image uploaded successfully:', imageUrl);
        
        // Update your state or do something with the URL
        setClothingItem(prev => ({ ...prev, imageUrl }));
        
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('No image to upload');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={iconColor} />
          </TouchableOpacity>
          <ThemedText type="title">Clothes Details</ThemedText>
          <TouchableOpacity>
            <IconSymbol name="bookmark" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}
          extraHeight={Platform.OS === 'ios' ? 50 : 0}
          enableAutomaticScroll={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            {imageBase64 ? (
              <>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#0a7ea4" />
                  </View>
                )}
                <Image
                  source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                  style={styles.clothingImage}
                  resizeMode="contain"
                  onLoadStart={() => setIsLoading(true)}
                  onLoadEnd={() => setIsLoading(false)}
                />
              </>
            ) : (
              <ThemedText>No image available</ThemedText>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} >
              {/*</TouchableOpacity> <TouchableOpacity style={styles.actionButton} onPress={handleImageUpload}> Test to upload image*/}
              <IconSymbol name="checkmark.circle" size={24} color={iconColor} />
              <ThemedText>Done</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="pencil" size={24} color={iconColor} />
              <ThemedText>Edit</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Information' && styles.activeTab]}
              onPress={() => setActiveTab('Information')}>
              <ThemedText type={activeTab === 'Information' ? "defaultSemiBold" : "default"}>
                Information
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Outfit' && styles.activeTab]}
              onPress={() => setActiveTab('Outfit')}>
              <ThemedText type={activeTab === 'Outfit' ? "defaultSemiBold" : "default"}>
                Outfit
              </ThemedText>
            </TouchableOpacity>
          </View>

          {activeTab === 'Information' ? (
            <>
              <View style={styles.section}>
                <ThemedText type="subtitle">Occasion info</ThemedText>

                <View style={styles.seasonTags}>
                  {seasons.map((season) => (
                    <TouchableOpacity
                      key={season}
                      style={[
                        styles.tag,
                        clothingItem.seasons.includes(season) && styles.selectedTag
                      ]}
                      onPress={() => toggleArrayItem('seasons', season)}
                    >
                      <ThemedText style={clothingItem.seasons.includes(season) && styles.selectedTagText}>
                        {season}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.occasionTags}>
                  {occasions.map((occasion) => (
                    <TouchableOpacity
                      key={occasion}
                      style={[
                        styles.tag,
                        clothingItem.occasions.includes(occasion) && styles.selectedTag
                      ]}
                      onPress={() => toggleArrayItem('occasions', occasion)}
                    >
                      <ThemedText style={clothingItem.occasions.includes(occasion) && styles.selectedTagText}>
                        {occasion}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <ThemedText type="subtitle">Item info</ThemedText>

                {renderDropdown('Category', 'category', CLOTHING_OPTIONS.category)}
                {renderDropdown('Style', 'style', CLOTHING_OPTIONS.style)}
                {renderDropdown('Pattern', 'pattern', CLOTHING_OPTIONS.pattern)}
                {renderDropdown('Material', 'material', CLOTHING_OPTIONS.material)}
                {renderDropdown('Fit', 'fit', CLOTHING_OPTIONS.fit)}
                {renderDropdown('Length', 'length', CLOTHING_OPTIONS.length)}
                {renderDropdown('Neckline', 'neckline', CLOTHING_OPTIONS.neckline)}
                {renderDropdown('Sleeve Length', 'sleeveLength', CLOTHING_OPTIONS.sleeveLength)}

                <View style={styles.infoRow}>
                  <ThemedText>Colors</ThemedText>
                  <View style={styles.colorSection}>
                    <View style={styles.colorCircles}>
                      {clothingItem.colors && clothingItem.colors.length > 0 ? (
                        clothingItem.colors.map((color) => (
                          <TouchableOpacity
                            key={color}
                            style={[
                              styles.colorCircle,
                              { backgroundColor: color.toLowerCase() },
                              color.toLowerCase() === 'white' && styles.whiteColorCircle
                            ]}
                            onPress={() => toggleArrayItem('colors', color)}
                          />
                        ))
                      ) : (
                        <ThemedText>No colors available</ThemedText>
                      )}
                    </View>
                    <TouchableOpacity
                      style={[styles.colorCircle, styles.addColorCircle]}
                      onPress={() => {
                        const availableColors = CLOTHING_OPTIONS.colors
                          .filter(c => !clothingItem.colors.includes(c));
                        if (availableColors.length > 0) {
                          toggleArrayItem('colors', availableColors[0]);
                        }
                      }}
                    >
                      <IconSymbol name="plus" size={16} color={iconColor} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.section}>
              <ThemedText type="subtitle">Outfit Combinations</ThemedText>

              <View style={styles.outfitSection}>
                <TouchableOpacity style={styles.addOutfitButton}>
                  <IconSymbol name="plus.circle" size={24} color={iconColor} />
                  <ThemedText style={styles.blueText}>Create New Outfit</ThemedText>
                </TouchableOpacity>

                <View style={styles.outfitList}>
                  <ThemedText style={styles.emptyOutfitText}>
                    No outfits created yet. Create your first outfit combination!
                  </ThemedText>
                </View>
              </View>
            </View>
          )}
        </KeyboardAwareScrollView>
      </ThemedView>
      {dropdownVisible && activeField && (
        <DropdownModal
          visible={dropdownVisible}
          onClose={() => {
            setDropdownVisible(false);
            setActiveField(null);
          }}
          options={
            activeField === 'colors'
              ? CLOTHING_OPTIONS.colors
              : CLOTHING_OPTIONS[activeField as keyof typeof CLOTHING_OPTIONS] || []
          }
          onSelect={(value) => handleItemChange(activeField, value)}
          selectedValue={clothingItem[activeField] as string}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 16,
  },
  clothingImage: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0a7ea4',
  },
  section: {
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  blueText: {
    color: '#0a7ea4',
  },
  seasonTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorSection: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-end',
  },
  colorCircles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-end',
    maxWidth: 200,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outfitSection: {
    padding: 16,
    gap: 16,
  },
  addOutfitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginVertical: 8,
  },
  outfitList: {
    padding: 16,
    alignItems: 'center',
  },
  emptyOutfitText: {
    color: '#666',
    textAlign: 'center',
  },
  selectedTag: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  selectedTagText: {
    color: 'white',
  },
  whiteColorCircle: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addColorCircle: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  occasionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dropdownContainer: {
    minWidth: 150,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    gap: 8,
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
    maxHeight: '70%',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'transparent',
  },
  dropdownText: {
    color: '#333',
    fontSize: 16,
  },
  selectedDropdownText: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
  selectedDropdownItem: {
    backgroundColor: '#e0f7fa',
  },
});