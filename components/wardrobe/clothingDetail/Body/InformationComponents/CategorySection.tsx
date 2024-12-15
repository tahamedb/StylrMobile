import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/CategorySection';

export const CATEGORIES = [
  'Tops', 
  'Robes', 
  'Pantalons', 
  'Jupes',
  'Vêtements d\'extérieur', 
  'Chaussures', 
  'Sacs',
  'Chapeaux', 
  'Bijoux', 
  'Autres Articles'
] as const;

export type Category = typeof CATEGORIES[number];

interface CategorySectionProps {
  initialCategory: string;
  isNewItem?: boolean;
  onUpdate: (value: string) => void;
}

export function CategorySection({ initialCategory, isNewItem, onUpdate }: CategorySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    setIsExpanded(false);
    onUpdate(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Catégorie</ThemedText>
        </View>
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {selectedCategory && (
            <ThemedText style={styles.selectedText}>
              {selectedCategory}
            </ThemedText>
          )}
          <IconSymbol
            name={isExpanded ? "chevron.up" : "chevron.right"}
            size={16}
            color="#000000"
          />
        </Pressable>
      </View>

      {isExpanded && (
        <View style={styles.categoryTags}>
          {CATEGORIES.map((category) => (
            <Pressable
              key={category}
              onPress={() => handleCategoryPress(category)}
              style={[
                styles.tag,
                selectedCategory === category && styles.tagSelected
              ]}
            >
              <ThemedText 
                style={[
                  styles.tagText,
                  selectedCategory === category && styles.tagTextSelected
                ]}
              >
                {category}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}