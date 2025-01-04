import { useState } from 'react';
import { ClothingItem } from '@/types/api.types';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { uploadImageToCloudinary } from '@/services/Cloudinary/CloudinaryServices';
import { useWardrobe } from '@/contexts/WardrobeContext';

export interface ClothingFormData extends Partial<ClothingItem> {
    imageBase64?: string;
    removeBackground?: boolean;
    pattern?: string;
    materials?: string[];
}

export function useClothingForm(initialData: Partial<ClothingItem>) {
  const { currentWardrobe } = useWardrobe();
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
    materials: [], // Initialize materials array
    removeBackground: false, // Default to false
    // Spread the initial data over the defaults
    ...initialData
  });
  const [isSaving, setIsSaving] = useState(false);

  const updateField = (field: keyof ClothingFormData, value: any) => {
    console.log(`Updating ${field} with:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveClothing = async () => {
    if (!currentWardrobe) {
      console.error('No wardrobe selected');
      return false;
    }

    try {
      setIsSaving(true);
      let itemToSave = { ...formData };

      // Always upload to Cloudinary first
      if (itemToSave.imageUrl) {
        console.log('Uploading image to Cloudinary...');
        try {
          const cloudinaryUrl = await uploadImageToCloudinary(
            itemToSave.imageUrl,
            itemToSave.removeBackground ? 'WeWear_nobg' : 'WeWear'
          );
          console.log('Cloudinary upload successful:', cloudinaryUrl);
          itemToSave.imageUrl = cloudinaryUrl;
        } catch (uploadError) {
          console.error('Failed to upload image to Cloudinary:', uploadError);
          return false;
        }
      }

      // Remove the removeBackground field before saving to backend
      delete itemToSave.removeBackground;
      delete itemToSave.imageBase64;

      console.log('Saving item with imageUrl:', itemToSave.imageUrl);

      // Create or update the clothing item
      if (formData.id) {
        await wardrobeService.updateClothingItem(currentWardrobe.id, formData.id, itemToSave);
      } else {
        await wardrobeService.createClothingItem(currentWardrobe.id, itemToSave, itemToSave.imageUrl ?? '');
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