import React from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../Style/HeaderDetailPage';

interface HeaderDetailPageProps {
  isDark: boolean;
}

export function HeaderDetailPage({ isDark }: HeaderDetailPageProps) {
  return (
    <View style={styles.header}>
     
      <Pressable>
        <IconSymbol 
          name="chevron.left"
          size={24}
          color={isDark ? 'white' : 'black'}
        />
      </Pressable>
      
      <ThemedText style={styles.title}>Détails des Vêtements</ThemedText>
      <View style={styles.headerRight}>
        <IconSymbol 
          name="star"
          size={24}
          color={isDark ? 'white' : 'black'}
        />
        <IconSymbol 
          name="ellipsis"
          size={24}
          color={isDark ? 'white' : 'black'}
        />
      </View>
    </View>
  );
}

