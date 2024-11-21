import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { styles } from './Style/FilterButton';

type FilterButtonProps = {
  onPress?: () => void;
  label?: string;
};

export function FilterButton({ 
  onPress, 
  label = "Le moins récemment porté" 
}: FilterButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable 
      style={[styles.filterButton, isDark && styles.filterButtonDark]}
      onPress={onPress}
    >
      <IconSymbol 
        name="slider.horizontal.3" 
        size={20} 
        color={isDark ? 'white' : 'black'} 
      />
      <ThemedText>{label}</ThemedText>
      <IconSymbol 
        name="chevron.down" 
        size={20} 
        color={isDark ? 'white' : 'black'} 
      />
    </Pressable>
  );
}

