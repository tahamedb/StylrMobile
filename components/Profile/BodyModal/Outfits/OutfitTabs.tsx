import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { OutfitTabsProps, TabType } from '@/types/api.types';

export const OutfitTabs: React.FC<OutfitTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  variant 
}) => {
  const tabs: TabType[] = variant === 'private'
    ? ['Idées', 'Tenue du jour', 'Recommandation']
    : ['Idées', 'Tenue du jour'];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab ? styles.activeTabText : styles.inactiveTabText
          ]}>
            {tab === 'Recommandation' ? 'Recommandations' : tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};