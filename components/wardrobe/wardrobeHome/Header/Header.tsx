import React from 'react';
import { View, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { FilterButton } from './FilterButton';
import { styles } from '../Style/Header';

type HeaderProps = {
  onOptionsPress: () => void;
  onCheckPress?: () => void;
  onFilterPress?: () => void;
  isSelectionMode?: boolean;
};

export function Header({ onOptionsPress, onCheckPress, isSelectionMode, onFilterPress }: HeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  return (
      <>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <IconSymbol
                name="chevron.left"
                size={24}
                color={isDark ? 'white' : 'black'}
            />
          </Pressable>
          <ThemedText style={styles.title}>Tous les vêtements</ThemedText>
          <View style={styles.headerRight}>
            <Pressable onPress={onCheckPress}>
              <IconSymbol
                  name={isSelectionMode ? "checkmark.circle.fill" : "checkmark.square"}
                  size={24}
                  color={isDark ? 'white' : 'black'}
              />
            </Pressable>
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