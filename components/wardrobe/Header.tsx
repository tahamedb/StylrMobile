import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { FilterButton } from './FilterButton';
import { styles } from './Style/Header';

type HeaderProps = {
  onOptionsPress: () => void;
  onFilterPress?: () => void;
};

export function Header({ onOptionsPress, onFilterPress }: HeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  return (
    <>
      <View style={styles.header}>
        <IconSymbol 
          name="chevron.left" 
          size={24} 
          color={isDark ? 'white' : 'black'} 
          onPress={() => router.back()}
        />
        <ThemedText style={styles.title}>Tous les vêtements</ThemedText>
        <View style={styles.headerRight}>
          <IconSymbol 
            name="checkmark.square" 
            size={24} 
            color={isDark ? 'white' : 'black'} 
          />
          <Pressable onPress={onOptionsPress}>
            <IconSymbol 
              name="ellipsis" 
              size={24} 
              color={isDark ? 'white' : 'black'} 
            />
          </Pressable>
          
        </View>
      </View>
      <FilterButton onPress={onFilterPress} />
    </>
  );
}
