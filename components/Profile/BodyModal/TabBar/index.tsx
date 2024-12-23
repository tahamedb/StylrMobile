import React from 'react';
import { View, TouchableOpacity, Text , ScrollView  } from 'react-native';
import { Wardrobe } from '../Wardrobe';
import { Outfits } from '../Outfits';
import { useBodyModal } from '@/hooks/profile/BodyModal/useBodyModal';
import { styles } from './styles';

interface BodyModalProps {
  variant: 'private' | 'public';
}

export const BodyModal = ({ variant }: BodyModalProps) => {
  const { selectedTab, routes, setSelectedTab } = useBodyModal();

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {routes.map((route) => (
          <TouchableOpacity
            key={route.key}
            style={[
              styles.tab,
              selectedTab === route.key && styles.activeTab
            ]}
            onPress={() => setSelectedTab(route.key)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === route.key && styles.activeTabText
            ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

      <View style={styles.content}>
        {selectedTab === 'wardrobe' ? 
          <Wardrobe variant={variant} /> : 
          <Outfits variant={variant} />}
      </View>
      </ScrollView>
    </View>
  );
};