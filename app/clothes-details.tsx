import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native';

export default function ClothesDetailsScreen() {
  const params = useLocalSearchParams();
  const imageBase64 = params.imageBase64 as string;
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  // State for all interactive elements
  const [activeTab, setActiveTab] = useState('Information');
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('Tops > Long Sleeve T-shirts');
  const [style, setStyle] = useState('Casual');
  const [pattern, setPattern] = useState('Graphic');
  const [material, setMaterial] = useState('Cotton');
  const [fit, setFit] = useState('Regular');
  const [length, setLength] = useState('Regular');
  const [neckline, setNeckline] = useState('Crew Neck');
  const [sleeveLength, setSleeveLength] = useState('Long Sleeve');
  const [brand, setBrand] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>(['white', 'black']);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [brandInput, setBrandInput] = useState('');
  const [showColorInput, setShowColorInput] = useState(false);
  const [newColor, setNewColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const occasions = ['Casual', 'Formal', 'Daily', 'Work', 'Sport', 'Party'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  // Handle season selection
  const toggleSeason = (season: string) => {
    setSelectedSeasons(prev => 
      prev.includes(season) 
        ? prev.filter(s => s !== season)
        : [...prev, season]
    );
  };

  // Handle occasion selection
  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions(prev => 
      prev.includes(occasion) 
        ? prev.filter(o => o !== occasion)
        : [...prev, occasion]
    );
  };

  // Handle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        {/* Header */}
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
          {/* Image Section with error handling */}
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
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="checkmark.circle" size={24} color={iconColor} />
              <ThemedText>Done</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="pencil" size={24} color={iconColor} />
              <ThemedText>Edit</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Information Tabs */}
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
              {/* Occasion Info Section */}
              <View style={styles.section}>
                <ThemedText type="subtitle">Occasion info</ThemedText>
                
                <View style={styles.seasonTags}>
                  {seasons.map((season) => (
                    <TouchableOpacity 
                      key={season} 
                      style={[
                        styles.tag,
                        selectedSeasons.includes(season) && styles.selectedTag
                      ]}
                      onPress={() => toggleSeason(season)}
                    >
                      <ThemedText style={selectedSeasons.includes(season) && styles.selectedTagText}>
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
                        selectedOccasions.includes(occasion) && styles.selectedTag
                      ]}
                      onPress={() => toggleOccasion(occasion)}
                    >
                      <ThemedText style={selectedOccasions.includes(occasion) && styles.selectedTagText}>
                        {occasion}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Item Info Section */}
              <View style={styles.section}>
                <ThemedText type="subtitle">Item info</ThemedText>
                
                <View style={styles.infoRow}>
                  <ThemedText>My Rate</ThemedText>
                  <View style={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity 
                        key={star}
                        onPress={() => setRating(star)}
                      >
                        <IconSymbol 
                          name="star.fill"
                          size={20}
                          color={star <= rating ? "#FFD700" : "#D3D3D3"}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Interactive dropdown-style buttons for each attribute */}
                {[
                  { label: 'Category', value: category, setter: setCategory },
                  { label: 'Style', value: style, setter: setStyle },
                  { label: 'Pattern', value: pattern, setter: setPattern },
                  { label: 'Material', value: material, setter: setMaterial },
                  { label: 'Fit', value: fit, setter: setFit },
                  { label: 'Length', value: length, setter: setLength },
                  { label: 'Neckline', value: neckline, setter: setNeckline },
                  { label: 'Sleeve Length', value: sleeveLength, setter: setSleeveLength },
                ].map(({ label, value, setter }) => (
                  <View key={label} style={styles.infoRow}>
                    <ThemedText>{label}</ThemedText>
                    {isEditing === label ? (
                      <TextInput
                        value={value}
                        onChangeText={setter}
                        onBlur={() => setIsEditing(null)}
                        autoFocus
                        style={styles.input}
                      />
                    ) : (
                      <TouchableOpacity onPress={() => setIsEditing(label)}>
                        <ThemedText style={styles.blueText}>{value}</ThemedText>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                <View style={styles.infoRow}>
                  <ThemedText>Brand</ThemedText>
                  {isEditing === 'Brand' ? (
                    <TextInput
                      value={brandInput}
                      onChangeText={setBrandInput}
                      onBlur={() => {
                        setBrand(brandInput);
                        setIsEditing(null);
                      }}
                      autoFocus
                      style={styles.input}
                    />
                  ) : (
                    <TouchableOpacity 
                      onPress={() => {
                        setBrandInput(brand);
                        setIsEditing('Brand');
                      }}
                    >
                      <ThemedText style={styles.blueText}>
                        {brand || 'Add brand'}
                      </ThemedText>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.infoRow}>
                  <ThemedText>Color</ThemedText>
                  <View style={styles.colorSection}>
                    <View style={styles.colorCircles}>
                      {selectedColors.map((color) => (
                        <TouchableOpacity 
                          key={color}
                          style={[
                            styles.colorCircle,
                            { backgroundColor: color },
                            color === 'white' && styles.whiteColorCircle
                          ]}
                          onPress={() => toggleColor(color)}
                        />
                      ))}
                    </View>
                    <TouchableOpacity 
                      style={[styles.colorCircle, styles.addColorCircle]}
                      onPress={() => setShowColorInput(true)}
                    >
                      <IconSymbol name="plus" size={16} color={iconColor} />
                    </TouchableOpacity>
                    
                    {showColorInput && (
                      <View style={styles.colorInputContainer}>
                        <TextInput
                          value={newColor}
                          onChangeText={setNewColor}
                          placeholder="Enter color"
                          style={styles.colorInput}
                          autoFocus
                          onBlur={() => {
                            if (newColor) {
                              setSelectedColors(prev => [...prev, newColor.toLowerCase()]);
                            }
                            setNewColor('');
                            setShowColorInput(false);
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </>
          ) : (
            // Outfit Content
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
  ratingStars: {
    flexDirection: 'row',
    gap: 4,
  },
  colorSection: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-end',
  },
  colorInputContainer: {
    marginTop: 8,
    width: '100%',
  },
  colorInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    width: '100%',
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
  input: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    minWidth: 120,
    color: '#0a7ea4',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
}); 