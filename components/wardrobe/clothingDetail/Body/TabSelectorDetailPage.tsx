import React from 'react';
import { View , Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '../Style/TabSelectorDetailPage';

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
