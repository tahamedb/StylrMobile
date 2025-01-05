import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { ClothingItem } from '@/types/api.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { ItemSelectionModal } from '@/components/wardrobe/ItemSelectionModal';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { useRouter } from 'expo-router';

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
  top: { icon: 'tshirt-crew', label: 'Add Top', category: 'Tops' },
  bottom: { icon: 'archive', label: 'Add Bottom', category: 'Pantalons' },
  dress: { icon: 'human-female', label: 'Add Dress', category: 'Robes' },
  outerwear: { icon: 'coat-rack', label: 'Add Outerwear', category: 'Vêtements d\'extérieur' },
  shoes: { icon: 'shoe-heel', label: 'Add Shoes', category: 'Chaussures' },
  accessories: { icon: 'necklace', label: 'Add Accessories', category: 'Bijoux' },
} as const;

export default function CreateOutfitScreen() {
  const [selectedSlot, setSelectedSlot] = useState<OutfitSlot | null>(null);
  const [outfitItems, setOutfitItems] = useState<OutfitSelection>({});
  const { currentWardrobe } = useWardrobe();
  const [isSaving, setIsSaving] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!currentWardrobe?.id || isSaving) return;

    // Validate outfit
    const hasTop = outfitItems.top;
    const hasBottom = outfitItems.bottom;
    const hasDress = outfitItems.dress;
    
    if (!hasDress && (!hasTop || !hasBottom)) {
      alert('Please select at least a top and bottom, or a dress');
      return;
    }

    if (!outfitName.trim()) {
      alert('Please enter a name for the outfit');
      return;
    }

    try {
      setIsSaving(true);
      
      // Create a list of clothing items for the outfit
      const clothingIds = Object.values(outfitItems)
        .filter((item): item is ClothingItem => !!item) // Remove undefined items
        .map(item => ({ id: item.id || 0 })); // Extract IDs

      await wardrobeService.createOutfit(currentWardrobe.id, {
        name: outfitName.trim(),
        wardrobe: { id: currentWardrobe.id },
        clothingItems: clothingIds,
      });

      // Clear the form after successful save
      setOutfitItems({});
      setOutfitName('');

      // Navigate back to outfits screen
      router.push('/outfits');
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

      <View style={styles.nameInputContainer}>
        <TextInput
          style={styles.nameInput}
          value={outfitName}
          onChangeText={setOutfitName}
          placeholder="Enter outfit name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.grid}>
        {Object.keys(SLOT_CONFIG).map((slot) => (
          renderPlaceholder(slot as OutfitSlot)
        ))}
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  nameInputContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nameInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
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
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyItem: {
    alignItems: 'center',
  },
  selectedItem: {
    alignItems: 'center',
  },
  placeholderLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  selectedLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  addText: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#999',
  },
}); 