import React, { useState } from 'react';
import { 
  View, 
  Modal, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { Wardrobe } from '@/types/api.types';

interface WardrobeModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: Wardrobe | null;
}

export function WardrobeModal({ visible, onClose, initialData }: WardrobeModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const { createNewWardrobe, refreshWardrobes } = useWardrobe();

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      setIsLoading(true);
      await createNewWardrobe({ name });
      await refreshWardrobes();
      setName('');
      onClose();
    } catch (error) {
      console.error('Failed to create wardrobe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.title}>
            {initialData ? 'Modifier la garde-robe' : 'Nouvelle garde-robe'}
          </ThemedText>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nom de la garde-robe"
            placeholderTextColor="#666"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={onClose}
            >
              <ThemedText>Annuler</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.submitText}>
                  {initialData ? 'Enregistrer' : 'Créer'}
                </ThemedText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  submitText: {
    color: '#fff',
  },
}); 