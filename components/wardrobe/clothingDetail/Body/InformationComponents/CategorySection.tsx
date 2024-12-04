import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/CategorySection';

type Category = 
  | 'Tops'
  | 'Robes'
  | 'Pantalons'
  | 'Jupes'
  | 'Vêtements d\'extérieur'
  | 'Chaussures'
  | 'Sacs'
  | 'Chapeaux'
  | 'Bijoux'
  | 'Autres Articles';

export function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const categories: Category[] = [
    'Tops', 'Robes', 'Pantalons', 'Jupes',
    'Vêtements d\'extérieur', 'Chaussures', 'Sacs',
    'Chapeaux', 'Bijoux', 'Autres Articles'
  ];

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
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
            size={20}
            color="#000000"
          />
        </Pressable>
      </View>

      {isExpanded && (
        <View style={styles.categoryTags}>
          {categories.map((category) => (
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
