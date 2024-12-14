import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { InformationContent } from './InformationComponents/InformationContent';
import { TabSelectorDetailPage } from './TabSelectorDetailPage';
import { HeaderDetailPage } from '../Header/HeaderDetailPage';
import { styles } from '../Style/ClothingDetailView';
import { TenueContent } from './TenueComponents/TenueContent';
import { ClothingItem } from '@/types/api.types';

interface ClothingDetailViewProps {
  imageUrl: string;
  brand: string;
  date: string;
  isDark: boolean;
 clothingDetail: ClothingItem;
}

export function ClothingDetailView({ imageUrl, brand, date, isDark , clothingDetail}: ClothingDetailViewProps) {
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
          <InformationContent clothingDetail = {clothingDetail}/>
        ) : (
          <TenueContent clothingId={1} />
        )}
      </ScrollView>
    </View>
  );
}