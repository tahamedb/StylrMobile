import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WardrobeSelectionModal } from './WardrobeSelectionModal';

export function WardrobeSelector() {
  const { currentWardrobe } = useWardrobe();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.selector}
          onPress={() => setShowModal(true)}
        >
          <ThemedText style={styles.currentWardrobe}>
            {currentWardrobe?.name || 'Select Wardrobe'}
          </ThemedText>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <WardrobeSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  currentWardrobe: {
    fontSize: 18,
    fontWeight: '600',
  },
}); 