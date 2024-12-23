import React, { useState } from 'react';
import { View, Pressable, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/PurchaseSection';
import { ClothingItem } from '@/types/api.types';

interface PurchaseSectionProps {
  initialSize?: string;
  initialPrice?: number;
  initialPurchaseDate?: string;
  initialPurchaseLink?: string;
  onUpdate: (field: keyof ClothingItem, value: any) => void;
}

export function PurchaseSection({ 
  initialSize,
  initialPrice,
  initialPurchaseDate,
  initialPurchaseLink,
  onUpdate
}: PurchaseSectionProps) {
  const [size, setSize] = useState(initialSize || '');
  const [price, setPrice] = useState(initialPrice?.toString() || '');
  const [purchaseDate, setPurchaseDate] = useState(initialPurchaseDate || '');
  const [purchaseLink, setPurchaseLink] = useState(initialPurchaseLink || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const clearInput = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter('');
  };

  const handleSizeChange = (value: string) => {
    setSize(value);
    onUpdate('size', value);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    onUpdate('price', parseFloat(value) || 0);
  };

  const handlePurchaseDateChange = (value: string) => {
    setPurchaseDate(value);
    onUpdate('purchaseDate', value);
  };

  const handlePurchaseLinkChange = (value: string) => {
    setPurchaseLink(value);
    onUpdate('purchaseLink', value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Info sur l'achat</ThemedText>
        </View>
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {price && (
            <ThemedText style={styles.priceText}>{price},00 $</ThemedText>
          )}
          <IconSymbol
            name={isExpanded ? "chevron.up" : "chevron.right"}
            size={16}
            color="#000000"
          />
        </Pressable>
      </View>

      {isExpanded && (
        <View style={styles.detailsContainer}>
          {/* Taille */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Taille</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={size}
                onChangeText={handleSizeChange}
                placeholder="Entrer Taille"
                placeholderTextColor="#A0A0A0"
              />
              {size !== '' && (
                <Pressable 
                  onPress={() => clearInput(setSize)}
                  style={styles.clearButton}
                >
                  <IconSymbol name="x.circle" size={20} color="#A0A0A0" />
                </Pressable>
              )}
            </View>
          </View>

          {/* Prix d'achat */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Prix d'achat</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={handlePriceChange}
                placeholder="15$"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
              />
              {price !== '' && (
                <Pressable 
                  onPress={() => clearInput(setPrice)}
                  style={styles.clearButton}
                >
                  <IconSymbol name="x.circle" size={20} color="#A0A0A0" />
                </Pressable>
              )}
            </View>
          </View>

          {/* Date d'achat */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Date d'achat</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={purchaseDate}
                onChangeText={handlePurchaseDateChange}
                placeholder="Entrez la date d'achat"
                placeholderTextColor="#A0A0A0"
              />
              {purchaseDate !== '' && (
                <Pressable 
                  onPress={() => clearInput(setPurchaseDate)}
                  style={styles.clearButton}
                >
                  <IconSymbol name="x.circle" size={20} color="#A0A0A0" />
                </Pressable>
              )}
            </View>
          </View>

          {/* Lien d'achat */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Lien d'achat</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={purchaseLink}
                onChangeText={handlePurchaseLinkChange}
                placeholder="Indiquez le lien d'achat"
                placeholderTextColor="#A0A0A0"
              />
              {purchaseLink !== '' && (
                <Pressable 
                  onPress={() => clearInput(setPurchaseLink)}
                  style={styles.clearButton}
                >
                  <IconSymbol name="x.circle" size={20} color="#A0A0A0" />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}