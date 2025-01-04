import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { styles } from '../Style/HeaderDetailPage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderDetailPageProps {
  isDark: boolean;
  isNewItem: boolean;
  onSave: () => Promise<void>;
  isSaving: boolean;
  removeBackground: boolean;
  onToggleBackground: (value: boolean) => void;
}

export function HeaderDetailPage({ 
  isDark, 
  isNewItem, 
  onSave, 
  isSaving,
  removeBackground,
  onToggleBackground
}: HeaderDetailPageProps) {
  const router = useRouter();

  return (
    <View style={[styles.header, isDark && styles.headerDark]}>
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialCommunityIcons name="close" size={24} color={isDark ? '#fff' : '#000'} />
      </TouchableOpacity>

      <View style={styles.headerActions}>
        {isNewItem && (
          <TouchableOpacity 
            style={[styles.backgroundToggle, removeBackground && styles.backgroundToggleActive]}
            onPress={() => onToggleBackground(!removeBackground)}
          >
            <MaterialCommunityIcons 
              name="image-off-outline" 
              size={20} 
              color={removeBackground ? '#fff' : '#666'} 
            />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <MaterialCommunityIcons 
              name="content-save" 
              size={24} 
              color="#fff" 
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

