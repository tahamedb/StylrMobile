import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { WardrobeList } from './WardrobeList';
import { WardrobeModal } from './WardrobeModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { Wardrobe } from '@/types/api.types';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';

interface WardrobeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

export function WardrobeSelectionModal({ visible, onClose }: WardrobeSelectionModalProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingWardrobe, setEditingWardrobe] = useState<Wardrobe | null>(null);
  const { currentWardrobe, refreshWardrobes } = useWardrobe();

  const handleEditWardrobe = (wardrobe: Wardrobe) => {
    setEditingWardrobe(wardrobe);
    setShowCreateModal(true);
  };

  const handleDeleteWardrobe = (wardrobe: Wardrobe) => {
    Alert.alert(
      'Delete Wardrobe',
      `Are you sure you want to delete "${wardrobe.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await wardrobeService.deleteWardrobe(wardrobe.id);
              // Refresh wardrobes list
              refreshWardrobes();
            } catch (error) {
              console.error('Failed to delete wardrobe:', error);
              Alert.alert('Error', 'Failed to delete wardrobe');
            }
          },
        },
      ]
    );
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setEditingWardrobe(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Select Wardrobe</ThemedText>
          <TouchableOpacity 
            onPress={() => setShowCreateModal(true)} 
            style={styles.headerButton}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <WardrobeList
          onEditWardrobe={handleEditWardrobe}
          onDeleteWardrobe={handleDeleteWardrobe}
        />

        <WardrobeModal
          visible={showCreateModal}
          onClose={handleModalClose}
          initialData={editingWardrobe}
        />
      </View>
    </Modal>
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
  headerButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
}); 