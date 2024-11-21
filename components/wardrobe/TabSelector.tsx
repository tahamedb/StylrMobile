import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles } from './Style/TabSelector';

type Tab = 'tous' | 'tops';

type TabSelectorProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.tabContainer, isDark && styles.tabContainerDark]}>
      <Pressable 
        style={[styles.tab, activeTab === 'tous' && styles.activeTab]}
        onPress={() => onTabChange('tous')}
      >
        <ThemedText style={activeTab === 'tous' ? styles.activeTabText : styles.tabText}>
          Tous
        </ThemedText>
      </Pressable>
      <Pressable 
        style={[styles.tab, activeTab === 'tops' && styles.activeTab]}
        onPress={() => onTabChange('tops')}
      >
        <ThemedText style={[
          styles.tabText,
          activeTab === 'tops' ? styles.activeTabText : (isDark && styles.tabTextDark)
        ]}>
          Tops
        </ThemedText>
      </Pressable>
    </View>
  );
}
