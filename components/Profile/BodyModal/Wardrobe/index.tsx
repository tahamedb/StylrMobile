import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Lock, AlertCircle } from 'lucide-react-native';
import { useWardrobe } from '@/hooks/profile/BodyModal/useWardrobe';
import { styles } from './styles';


export const Wardrobe = () => {
  const { wardrobeData, isLoading, error, setSelectedCategory } = useWardrobe();
  const totalItems = wardrobeData?.length || 0;

  // Prendre les 4 premiers vêtements pour l'aperçu
  const previewItems = wardrobeData?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <AlertCircle size={24} color="#FF0000" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {/* Tous les vêtements */ }
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => setSelectedCategory('all')}
        >
          <View style={styles.previewGrid}>
            {previewItems.map((item, index) => (
              <Image
                key={item.id}
                source={{ uri: item.imageUrl }}
                style={[
                  styles.smallPreviewImage,
                  index % 2 === 1 && styles.rightImage,
                  index > 1 && styles.bottomImage
                ]}
              />
            ))}
          </View>
          <View style={styles.itemFooter}>
            <Text style={styles.itemTitle}>Tous les vêtements</Text>
            <View style={styles.countContainer}>
              <Lock size={16} color="#666" />
              <Text style={styles.countText}>{totalItems}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/*Créer une garde-robe*/}
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => setSelectedCategory('create')}
        >
          <View style={styles.createButton}>
            <View style={styles.plusIcon}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <Text style={styles.createText}>Créer une garde-robe</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

