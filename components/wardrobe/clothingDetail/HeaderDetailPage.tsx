import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface HeaderDetailPageProps {
  isDark: boolean;
}

export function HeaderDetailPage({ isDark }: HeaderDetailPageProps) {
  return (
    <View style={styles.header}>
      <Link href="/(tabs)/wardrobe" asChild>
        <Pressable>
          <IconSymbol 
            name="chevron.left"
            size={24}
            color={isDark ? 'white' : 'black'}
          />
        </Pressable>
      </Link>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});