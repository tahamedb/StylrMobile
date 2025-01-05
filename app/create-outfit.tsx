import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ClothingItem } from '@/types/api.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { ItemSelectionModal } from '@/components/wardrobe/ItemSelectionModal';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';

type OutfitSlot = 'top' | 'bottom' | 'dress' | 'outerwear' | 'shoes' | 'accessories';

interface OutfitSelection {
  top?: ClothingItem;
  bottom?: ClothingItem;
  dress?: ClothingItem;
  outerwear?: ClothingItem;
  shoes?: ClothingItem;
  accessories?: ClothingItem[];
}

const SLOT_CONFIG = {
  top: { icon: 'tshirt-crew', label: 'Add Top' },
  bottom: { icon: 'archive', label: 'Add Bottom' },
  dress: { icon: 'human-female', label: 'Add Dress' },
  outerwear: { icon: 'coat-rack', label: 'Add Outerwear' },
  shoes: { icon: 'shoe-heel', label: 'Add Shoes' },
  accessories: { icon: 'necklace', label: 'Add Accessories' },
} as const;

export default function CreateOutfitScreen() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<OutfitSlot | null>(null);
  const [outfitItems, setOutfitItems] = useState<OutfitSelection>({});
  const { currentWardrobe } = useWardrobe();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    console.log('Saving outfit:', outfitItems);
    console.log('Current wardrobe:', currentWardrobe);
    console.log('isSaving:', isSaving);
    if (!currentWardrobe?.id || isSaving) return;

    // Validate outfit composition
    const hasTop = outfitItems.top;
    const hasBottom = outfitItems.bottom;
    const hasDress = outfitItems.dress;
    
    if (!hasDress && (!hasTop || !hasBottom)) {
      alert('Please select at least a top and bottom, or a dress');
      return;
    }

    try {
      setIsSaving(true);
      
      await wardrobeService.createOutfit(currentWardrobe.id, {
        name: 'New Outfit',
        wardrobe: { id: currentWardrobe.id },
        top: outfitItems.top ? { id: outfitItems.top.id } : undefined,
        bottom: outfitItems.bottom ? { id: outfitItems.bottom.id } : undefined,
        dress: outfitItems.dress ? { id: outfitItems.dress.id } : undefined,
        outerwear: outfitItems.outerwear ? { id: outfitItems.outerwear.id } : undefined,
        shoes: outfitItems.shoes ? { id: outfitItems.shoes.id } : undefined,
        accessories: outfitItems.accessories?.map(item => ({ id: item.id })) || [],
        season: 'All',
        occasion: 'Casual',
        tags: [],
        rating: 0,
        timesWorn: 0
      });

      alert('Outfit saved successfully!');
      router.back();
    } catch (error) {
      console.error('Error saving outfit:', error);
      alert('Failed to save outfit');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectItem = (item: ClothingItem) => {
    if (!selectedSlot) return;

    setOutfitItems(prev => ({
      ...prev,
      [selectedSlot]: item
    }));
  };

  const renderPlaceholder = (slot: OutfitSlot) => {
    const config = SLOT_CONFIG[slot];
    const selectedItem = outfitItems[slot];

    // Handle array case for accessories
    const displayName = Array.isArray(selectedItem) 
      ? `${selectedItem.length} items selected`
      : selectedItem?.name || 'Unnamed Item';

    return (
      <TouchableOpacity 
        key={slot}
        style={styles.placeholder}
        onPress={() => setSelectedSlot(slot)}
      >
        {selectedItem ? (
          <View style={styles.selectedItem}>
            <MaterialCommunityIcons name={config.icon} size={32} color="#000" />
            <Text style={styles.selectedLabel}>{displayName}</Text>
          </View>
        ) : (
          <View style={styles.emptyItem}>
            <MaterialCommunityIcons name={config.icon} size={32} color="#666" />
            <Text style={styles.placeholderLabel}>{config.label}</Text>
            <Text style={styles.addText}>Tap to add</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Outfit</Text>
          <TouchableOpacity 
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={[
              styles.saveButtonText,
              isSaving && styles.saveButtonTextDisabled
            ]}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {Object.keys(SLOT_CONFIG).map((slot) => (
            renderPlaceholder(slot as OutfitSlot)
          ))}
        </View>
      </ScrollView>

      {selectedSlot && (
        <ItemSelectionModal
          category={selectedSlot}
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#11181C',
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  placeholder: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyItem: {
    alignItems: 'center',
    gap: 8,
  },
  selectedItem: {
    alignItems: 'center',
    gap: 8,
  },
  placeholderLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#687076',
    textAlign: 'center',
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#11181C',
    textAlign: 'center',
  },
  addText: {
    fontSize: 14,
    color: '#687076',
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButtonTextDisabled: {
    color: '#687076',
  },
}); 