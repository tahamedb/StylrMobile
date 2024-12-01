import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

type DetailTab = 'information' | 'tenue';

interface DetailTabsProps {
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
}

export function TabSelectorDetailPage({ activeTab, onTabChange }: DetailTabsProps) {
  return (
    <View style={styles.tabBar}>
      <Pressable 
        style={[styles.tab, activeTab === 'information' && styles.activeTab]}
        onPress={() => onTabChange('information')}
      >
        <ThemedText style={[
          styles.tabText,
          activeTab === 'information' && styles.activeTabText
        ]}>
          Information
        </ThemedText>
      </Pressable>
      <Pressable 
        style={[styles.tab, activeTab === 'tenue' && styles.activeTab]}
        onPress={() => onTabChange('tenue')}
      >
        <ThemedText style={[
          styles.tabText,
          activeTab === 'tenue' && styles.activeTabText
        ]}>
          Tenue
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    opacity: 0.7,
  },
  activeTabText: {
    opacity: 1,
    fontWeight: '500',
  }
});