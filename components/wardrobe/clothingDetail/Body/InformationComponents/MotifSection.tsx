import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/MotifSection';
import { ClothingItem } from '@/types/api.types';

export const MATERIALS = [
  'Coton',
  'Lin',
  'Laine',
  'Soie',
  'Polyester',
  'Nylon',
  'Cuir',
  'Daim',
  'Denim',
  'Velours',
  'Satin',
  'Jersey',
  'Cachemire',
  'Flanelle',
  'Maille',
  'Molleton',
  'Tweed',
  'Néoprène',
  'Tulle',
  'Dentelle',
  'Mousseline',
  'Viscose',
  'Élasthanne',
  'Autres Matériaux'
] as const;

export type Material = typeof MATERIALS[number];

interface MotifSectionProps {
  initialMaterial?: string;
  initialMaterials?: string[];
  onUpdate: (field: keyof ClothingItem, value: any) => void;
}

export function MotifSection({ initialMaterial, initialMaterials = [], onUpdate }: MotifSectionProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    initialMaterials.length > 0 ? initialMaterials : initialMaterial ? [initialMaterial] : []
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMaterialPress = (material: string) => {
    setSelectedMaterials(current => {
      const isSelected = current.includes(material);
      const newMaterials = isSelected
        ? current.filter(m => m !== material)
        : [...current, material];
      
      // Update both single material and materials array
      onUpdate('material', newMaterials[0] || '');
      onUpdate('materials', newMaterials);
      
      return newMaterials;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Matériaux</ThemedText>
        </View>
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {selectedMaterials.length > 0 && (
            <View style={styles.selectedPatternsContainer}>
              {selectedMaterials.length <= 2 ? (
                selectedMaterials.map((material, index) => (
                  <ThemedText key={material} style={styles.selectedText}>
                    {material}{index < selectedMaterials.length - 1 ? ', ' : ''}
                  </ThemedText>
                ))
              ) : (
                <ThemedText style={styles.selectedText}>
                  {selectedMaterials.length} matériaux sélectionnés
                </ThemedText>
              )}
            </View>
          )}
          <IconSymbol
            name={isExpanded ? "chevron.up" : "chevron.right"}
            size={16}
            color="#000000"
          />
        </Pressable>
      </View>

      {isExpanded && (
        <View style={styles.patternGrid}>
          {MATERIALS.map((material) => (
            <Pressable
              key={material}
              onPress={() => handleMaterialPress(material)}
              style={[
                styles.patternTag,
                selectedMaterials.includes(material) && styles.tagSelected
              ]}
            >
              <ThemedText 
                style={[
                  styles.tagText,
                  selectedMaterials.includes(material) && styles.tagTextSelected
                ]}
              >
                {material}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}