import { ClothingItem } from './api.types';

export type OutfitSlot = 'top' | 'bottom' | 'dress' | 'outerwear' | 'shoes' | 'accessories';

export interface OutfitSelection {
  top?: ClothingItem;
  bottom?: ClothingItem;
  dress?: ClothingItem;
  outerwear?: ClothingItem;
  shoes?: ClothingItem;
  accessories?: ClothingItem[];
}

export const SLOT_CONFIG = {
  top: { icon: 'shirt-outline', label: 'Top', category: 'Tops' },
  bottom: { icon: 'archive-outline', label: 'Bottom', category: 'Pantalons' },
  dress: { icon: 'woman-outline', label: 'Dress', category: 'Robes' },
  outerwear: { icon: 'shirt-outline', label: 'Outerwear', category: 'Vêtements d\'extérieur' },
  shoes: { icon: 'footsteps-outline', label: 'Shoes', category: 'Chaussures' },
  accessories: { icon: 'diamond-outline', label: 'Accessories', category: 'Bijoux' },
} as const; 
