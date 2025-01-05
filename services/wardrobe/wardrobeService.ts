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
    try {
      const now = new Date().toISOString();
      const wardrobeData = {
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      
      // Create the wardrobe using the /me endpoint to automatically associate with current user
      return await apiClientWrapper.post<Wardrobe>('/wardrobes/me', wardrobeData);
    } catch (error) {
      console.error('Error creating wardrobe:', error);
      throw error;
    }
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
    try {
      console.log('Fetching all clothing items...');
      // Use the /me endpoint which will use the authenticated user's token
      const response = await apiClientWrapper.get<ClothingItem[]>('/users/me/clothing-items');
      console.log('All clothing items response:', response);
      return response || [];
    } catch (error) {
      console.error('Error fetching all clothing items:', error);
      throw error;
    }
  },

  getClothingItemById: async (wardrobeId: number, itemId: number) => {
    console.log("Fetching clothing item:", wardrobeId, itemId);
    return await apiClientWrapper.get<ClothingItem>(
      `/wardrobes/${wardrobeId}/clothing-items/${itemId}`
    );
  },

  createClothingItem: async (wardrobeId: number, data: Partial<ClothingItem>, imageUrl: string) => {
    const now = new Date().toISOString();
    const itemData = {
      ...data,
      wardrobe: { id: wardrobeId },
      createdAt: now,
      updatedAt: now,
    };
    itemData.imageUrl = imageUrl;
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

  getOutfitById: async (outfitId: number) => {
    try {
      console.log('Fetching outfit by ID:', outfitId);
      const response = await apiClientWrapper.get<Outfit>(`/outfits/${outfitId}`);
      console.log('Outfit response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching outfit:', error);
      throw error;
    }
  },

  getWardrobeOutfits: async (wardrobeId: number) => {
    try {
      console.log('Fetching outfits for wardrobe:', wardrobeId);
      const response = await apiClientWrapper.get<Outfit[]>(`/wardrobes/${wardrobeId}/outfits`);
      console.log('Wardrobe outfits response:', response);
      return response || [];
    } catch (error) {
      console.error('Error fetching wardrobe outfits:', error);
      throw error;
    }
  },

  createOutfit: async (wardrobeId: number, data: Partial<Outfit>) => {
    try {
        console.log('Creating outfit:', {
            wardrobeId,
            data
        });

        const now = new Date().toISOString();
        const outfitData = {
            ...data,
            wardrobe: { id: wardrobeId },
            createdAt: now,
            updatedAt: now,
            rating: data.rating || 0,
            timesWorn: data.timesWorn || 0
        };

        const response = await apiClientWrapper.post<Outfit>(
            `/wardrobes/${wardrobeId}/outfits`,
            outfitData
        );

        console.log('Outfit created successfully:', response);
        return response;
    } catch (error) {
        console.error('Error creating outfit:', error);
        throw error;
    }
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

  // Wardrobe Items
  getWardrobeItems: async (wardrobeId: number) => {
    try {
      console.log('Fetching items for wardrobe:', wardrobeId);
      const response = await apiClientWrapper.get<ClothingItem[]>(`/wardrobes/${wardrobeId}/clothing-items`);
      console.log('Wardrobe items response:', response);
      return response || [];
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
      throw error;
    }
  },

  async getClothingItemDirectly(clothingId: number): Promise<ClothingItem | null> {
    try {
        const response = await apiClientWrapper.get<ClothingItem>(`/clothing-items/${clothingId}`);
      return response;
    } catch (error) {
      console.error('Error fetching clothing item directly:', error);
      return null;
    }
  },

  async injectTestData(): Promise<void> {
    interface TestDataResponse {
        ok: boolean;
        data?: {
            message?: string;
        };
    }

    const response = await apiClientWrapper.post<TestDataResponse>('/test-data/inject', {});
    if (!response.ok) {
        throw new Error(response.data?.message || 'Failed to inject test data');
    }
  },

  getRecommendedOutfits: async (wardrobeId: number, season?: string, occasion?: string) => {
    const params = new URLSearchParams();
    if (season) params.append('season', season);
    if (occasion) params.append('occasion', occasion);
    return await apiClientWrapper.get<Outfit[]>(`/outfits/recommendations?${params.toString()}`);
  },

  getPopularOutfits: async (wardrobeId: number) => {
    return await apiClientWrapper.get<Outfit[]>('/outfits/popular');
  },

  getSimilarOutfits: async (wardrobeId: number, outfitId: number) => {
    return await apiClientWrapper.get<Outfit[]>(`/outfits/${outfitId}/similar`);
  },

  rateOutfit: async (wardrobeId: number, outfitId: number, rating: number) => {
    return await apiClientWrapper.post<Outfit>(`/outfits/${outfitId}/rate?rating=${rating}`, {});
  },

  incrementOutfitWear: async (wardrobeId: number, outfitId: number) => {
    return await apiClientWrapper.post<Outfit>(`/outfits/${outfitId}/wear`, {});
  },
};
