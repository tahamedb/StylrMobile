import { apiClientWrapper } from '../api/client';
import { Wardrobe, ClothingItem, Outfit } from '@/types/api.types';
import { authService } from '../auth/authService';

export const wardrobeService = {
  // Wardrobe Management
  getAllWardrobes: async () => {
    return await apiClientWrapper.get<Wardrobe[]>('/wardrobes');
  },

  getWardrobeById: async (id: number) => {
    return await apiClientWrapper.get<Wardrobe>(`/wardrobes/${id}`);
  },

  createWardrobe: async (data: Partial<Wardrobe>) => {
    const now = new Date().toISOString();
    const wardrobeData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    return await apiClientWrapper.post<Wardrobe>('/wardrobes', wardrobeData);
  },

  updateWardrobe: async (id: number, data: Partial<Wardrobe>) => {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return await apiClientWrapper.put<Wardrobe>(`/wardrobes/${id}`, updateData);
  },

  deleteWardrobe: async (id: number) => {
    return await apiClientWrapper.delete(`/wardrobes/${id}`);
  },

  // Clothing Items Management
  getAllClothingItems: async () => {
    // Use the /me endpoint which will use the authenticated user's token
    return await apiClientWrapper.get<ClothingItem[]>('/users/me/clothing-items');
  },

  getClothingItemById: async (wardrobeId: number, itemId: number) => {
    console.log("logging info :")
      console.log(wardrobeId, itemId);
    return await apiClientWrapper.get<ClothingItem>(
      `/wardrobes/${wardrobeId}/clothing-items/${itemId}`
    );
  },

  createClothingItem: async (wardrobeId: number, data: Partial<ClothingItem>) => {
    const now = new Date().toISOString();
    const itemData = {
      ...data,
      wardrobe: { id: wardrobeId },
      createdAt: now,
      updatedAt: now,
    };
    return await apiClientWrapper.post<ClothingItem>(
      `/wardrobes/${wardrobeId}/clothing-items`, 
      itemData
    );
  },

  updateClothingItem: async (wardrobeId: number, itemId: number, data: Partial<ClothingItem>) => {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return await apiClientWrapper.put<ClothingItem>(
      `/wardrobes/${wardrobeId}/clothing-items/${itemId}`, 
      updateData
    );
  },

  deleteClothingItem: async (wardrobeId: number, itemId: number) => {
    return await apiClientWrapper.delete(
      `/wardrobes/${wardrobeId}/clothing-items/${itemId}`
    );
  },

  // Outfit Management
  getAllOutfits: async () => {
    return await apiClientWrapper.get<Outfit[]>('/wardrobes/outfits');
  },

  getWardrobeOutfits: async (wardrobeId: number) => {
      return await apiClientWrapper.get<Outfit[]>(`/wardrobes/${wardrobeId}/clothing-items`);
  },

  createOutfit: async (wardrobeId: number, data: Partial<Outfit>) => {
    const now = new Date().toISOString();
    const outfitData = {
      ...data,
      wardrobe: { id: wardrobeId },
      createdAt: now,
      updatedAt: now,
    };
    return await apiClientWrapper.post<Outfit>(`/wardrobes/${wardrobeId}/outfits`, outfitData);
  },

  updateOutfit: async (wardrobeId: number, outfitId: number, data: Partial<Outfit>) => {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return await apiClientWrapper.put<Outfit>(`/wardrobes/${wardrobeId}/outfits/${outfitId}`, updateData);
  },

  deleteOutfit: async (wardrobeId: number, outfitId: number) => {
    return await apiClientWrapper.delete(`/wardrobes/${wardrobeId}/outfits/${outfitId}`);
  },

  // Backward compatibility
  getWardrobeItems: async (wardrobeId: number) => {
    return await apiClientWrapper.get<ClothingItem[]>(`/wardrobes/${wardrobeId}/clothing-items`);
  },
};
