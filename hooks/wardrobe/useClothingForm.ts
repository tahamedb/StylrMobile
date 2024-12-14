import { useState } from 'react';
import { ClothingItem } from '@/types/api.types';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { uploadImageToCloudinary } from '@/services/Cloudinary/CloudinaryServices';

export interface ClothingFormData extends Partial<ClothingItem> {
    imageBase64?: string;
}

export function useClothingForm(initialData: Partial<ClothingItem>) {
  const [formData, setFormData] = useState<ClothingFormData>({
    // Default values for new items
    name: '',
    category: '',
    color: '',
    size: '',
    material: '',
    season: '',
    brand: '',
    rating: 0,
    price: 0,
    purchaseDate: '',
    purchaseLink: '',
    colors: [],
    // Spread the initial data over the defaults
    ...initialData
  });
  const [isSaving, setIsSaving] = useState(false);

  const updateField = (field: keyof ClothingItem, value: any) => {
    console.log(`Updating ${field} with:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveClothing = async () => {
    try {
      setIsSaving(true);
      let itemToSave = { ...formData };

      // If we have a base64 image, upload it first
      if (formData.imageUrl) {
        console.log('Uploading image to Cloudinary...');
        const cloudinaryUrl = await uploadImageToCloudinary(formData.imageUrl);
        itemToSave.imageUrl = cloudinaryUrl;
      }

      console.log('Saving clothing item with data:', itemToSave);

      // Create or update the clothing item
      if (formData.id) {
        await wardrobeService.updateClothingItem(formData.id, itemToSave);
      } else {
        await wardrobeService.createClothingItem(itemToSave);
      }
      return true;

    } catch (error) {
      console.error('Error saving clothing:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    formData,
    updateField,
    saveClothing,
    isSaving
  };
} 