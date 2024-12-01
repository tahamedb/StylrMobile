import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { InformationContent, TenueContent } from './DetailPageContenent';
import { TabSelectorDetailPage } from './TabSelectorDetailPage';
import { HeaderDetailPage } from './HeaderDetailPage';

interface ClothingDetailViewProps {
  imageUrl: string;
  brand: string;
  date: string;
  isDark: boolean;
}

export function ClothingDetailView({ imageUrl, brand, date, isDark }: ClothingDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'information' | 'tenue'>('information');

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <HeaderDetailPage isDark={isDark} />
      
      <ScrollView>
        <Image 
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <TabSelectorDetailPage
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'information' ? (
          <InformationContent />
        ) : (
          <TenueContent />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#f5f5f5',
  },
});