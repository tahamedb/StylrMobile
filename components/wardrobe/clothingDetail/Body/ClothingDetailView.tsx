import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { InformationContent } from './InformationComponents/InformationContent';
import { TabSelectorDetailPage } from './TabSelectorDetailPage';
import { HeaderDetailPage } from '../Header/HeaderDetailPage';
import { styles } from '../Style/ClothingDetailView';
import { TenueContent } from './TenueComponents/TenueContent';
import { ClothingItem } from '@/types/api.types';
import { useClothingForm } from '@/hooks/wardrobe/useClothingForm';
import { useRouter } from 'expo-router';

interface ClothingDetailViewProps {
  imageUrl: string;
  brand: string;
  date: string;
  isDark: boolean;
  clothingDetail: ClothingItem;
  isNewItem?: boolean;
}

export function ClothingDetailView({ 
  imageUrl, 
  brand, 
  date, 
  isDark, 
  clothingDetail,
  isNewItem 
}: ClothingDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'information' | 'tenue'>('information');
  const router = useRouter();
  const { formData, updateField, saveClothing, isSaving } = useClothingForm({
    ...clothingDetail,
    imageUrl: imageUrl
  });

  const handleSave = async () => {
    const success = await saveClothing();
    if (success) {
      // Navigate back or to the wardrobe screen
      router.back();
      // Or router.push('/wardrobe');
    } else {
      // Show error message
      alert('Failed to save clothing item');
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <HeaderDetailPage 
        isDark={isDark} 
        isNewItem={isNewItem}
        onSave={handleSave}
        isSaving={isSaving}
      />
      
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
          <InformationContent 
            clothingDetail={formData}
            isNewItem={isNewItem}
            onUpdate={(field, value) => {
              console.log('Updating field:', field, 'with value:', value);
              updateField(field, value);
            }}
          />
        ) : (
          <TenueContent clothingId={formData.id} />
        )}
      </ScrollView>
    </View>
  );
}
