import React from 'react';
import { View, Pressable, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../Style/HeaderDetailPage';

interface HeaderDetailPageProps {
  isDark: boolean;
  isNewItem?: boolean;
  onSave?: () => void;
  isSaving?: boolean;
}

export function HeaderDetailPage({ isDark, isNewItem, onSave, isSaving }: HeaderDetailPageProps) {
  return (
    <View style={styles.header}>
      <Pressable>
        <MaterialCommunityIcons 
          name="chevron-left"
          size={24}
          color={isDark ? 'white' : 'black'}
        />
      </Pressable>
      
      <ThemedText style={styles.title}>
        {isNewItem ? 'Nouveau Vêtement' : 'Détails des Vêtements'}
      </ThemedText>
      
      <View style={styles.headerRight}>
        {isNewItem && (
          <Pressable 
            onPress={onSave}
            disabled={isSaving}
            style={styles.saveButton}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color={isDark ? 'white' : 'black'} />
            ) : (
              <MaterialCommunityIcons 
                name="content-save"
                size={24}
                color={isDark ? 'white' : 'black'}
              />
            )}
          </Pressable>
        )}
        {!isNewItem && (
          <>
            <MaterialCommunityIcons 
              name="star-outline"
              size={24}
              color={isDark ? 'white' : 'black'}
            />
            <MaterialCommunityIcons 
              name="dots-horizontal"
              size={24}
              color={isDark ? 'white' : 'black'}
            />
          </>
        )}
      </View>
    </View>
  );
}

