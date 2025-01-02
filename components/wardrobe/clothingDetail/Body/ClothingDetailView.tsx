import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { InformationContent } from './InformationComponents/InformationContent';
import { TabSelectorDetailPage } from './TabSelectorDetailPage';
import { HeaderDetailPage } from '../Header/HeaderDetailPage';
import { styles } from '../Style/ClothingDetailView';
import { TenueContent } from './TenueComponents/TenueContent';
import { ClothingItem } from '@/types/api.types';
import { useClothingForm } from '@/hooks/wardrobe/useClothingForm';
import { useRouter } from 'expo-router';
import { predictClothingAttributes, PredictionResponse } from '@/services/AI/predictionService';
import { ThemedText } from '@/components/ThemedText';

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
  const [isPredicting, setIsPredicting] = useState(false);
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const router = useRouter();
  const { formData, updateField, saveClothing, isSaving } = useClothingForm({
    ...clothingDetail,
    imageUrl: currentImage
  });

  useEffect(() => {
    if (isNewItem && currentImage) {
      predictAttributes();
    }
  }, [isNewItem, currentImage]);

  const predictAttributes = async () => {
    try {
      setPredictionError(null);
      setIsPredicting(true);
      const predictions = await Promise.race<PredictionResponse>([
        predictClothingAttributes(currentImage),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('API timeout')), 20000)
        )
      ]);
      
      // Update category
      if (predictions.category) {
        updateField('category', predictions.category);
      }

      // Update colors - remove duplicates
      if (predictions.colors && predictions.colors.length > 0) {
        const uniqueColors = Array.from(new Set(predictions.colors.map(color => color.name)));
        updateField('colors', uniqueColors);
      }

      // Update materials - support multiple materials
      if (predictions.materials && predictions.materials.length > 0) {
        const uniqueMaterials = Array.from(new Set(predictions.materials));
        updateField('materials', uniqueMaterials); // Update materials array
        updateField('material', uniqueMaterials[0] || ''); // Keep first material for backward compatibility
      }

      // Update occasions
      if (predictions.occasions && predictions.occasions.length > 0) {
        updateField('occasion', predictions.occasions[0]); // Use the first occasion
      }

      // Update seasons
      if (predictions.seasons && predictions.seasons.length > 0) {
        updateField('season', predictions.seasons[0]); // Use the first season
      }

      // Store pattern information
      if (predictions.pattern) {
        updateField('pattern', predictions.pattern);
      }

      console.log('Successfully updated form with predictions:', predictions);
    } catch (error) {
      console.error('Error predicting attributes:', error);
      setPredictionError('Could not reach the prediction server. Please fill in the details manually.');
      // Clear error message after 2 seconds
      setTimeout(() => {
        setPredictionError(null);
      }, 2000);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleSave = async () => {
    const success = await saveClothing();
    if (success) {
      router.back();
    } else {
      alert('Failed to save clothing item');
    }
  };

  const handleToggleBackground = (value: boolean) => {
    updateField('removeBackground', value);
  };

  if (isPredicting) {
    return (
      <View style={[styles.container, isDark && styles.containerDark, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={isDark ? 'white' : 'black'} />
        <ThemedText style={styles.loadingText}>Analyzing your clothing...</ThemedText>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <HeaderDetailPage 
        isDark={isDark} 
        isNewItem={isNewItem}
        onSave={handleSave}
        isSaving={isSaving}
        removeBackground={formData.removeBackground}
        onToggleBackground={handleToggleBackground}
      />
      
      <ScrollView>
        {predictionError && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{predictionError}</ThemedText>
          </View>
        )}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: currentImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
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
          <TenueContent clothingId={formData.id || 0} />
        )}
      </ScrollView>
    </View>
  );
}
