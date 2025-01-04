import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Wardrobe } from '@/types/api.types';
import { WardrobeStats } from './WardrobeStats';

interface WardrobeDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  wardrobe: Wardrobe;
}

export function WardrobeDetailsModal({ visible, onClose, wardrobe }: WardrobeDetailsModalProps) {
  const [shareEmail, setShareEmail] = useState('');

  const handleShare = async () => {
    if (!shareEmail.trim()) return;
    try {
      // Implement sharing logic here
      setShareEmail('');
    } catch (error) {
      console.error('Failed to share wardrobe:', error);
    }
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
          <ThemedText style={styles.title}>{wardrobe.name}</ThemedText>
          <View style={styles.headerButton} />
        </View>

        <WardrobeStats items={wardrobe.clothingItems || []} />

        <View style={styles.shareSection}>
          <ThemedText style={styles.sectionTitle}>Share Wardrobe</ThemedText>
          <View style={styles.shareInput}>
            <TextInput
              placeholder="Enter email to share"
              value={shareEmail}
              onChangeText={setShareEmail}
              style={styles.input}
            />
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={handleShare}
            >
              <MaterialCommunityIcons name="share" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  shareInput: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  shareButton: {
    backgroundColor: '#000',
    width: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 