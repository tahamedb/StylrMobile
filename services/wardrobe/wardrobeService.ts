import { apiClientWrapper } from '../api/client';
import { Wardrobe, ClothingItem, Outfit } from '@/types/api.types';
import { authService } from '../auth/authService';

// Color harmony rules
const COLOR_COMBINATIONS = {
  red: {
    matching: ['white', 'black', 'navy', 'gray', 'beige'],
    confidence: 85,
    reason: 'Classic color combination that creates a bold and sophisticated look'
  },
  blue: {
    matching: ['white', 'gray', 'beige', 'brown', 'navy'],
    confidence: 90,
    reason: 'Timeless combination that works well for any occasion'
  },
  black: {
    matching: ['white', 'gray', 'red', 'beige', 'any'],
    confidence: 95,
    reason: 'Versatile neutral that pairs well with most colors'
  },
  white: {
    matching: ['any'],
    confidence: 90,
    reason: 'Clean and versatile base that complements any color'
  },
  green: {
    matching: ['white', 'beige', 'brown', 'gray', 'navy'],
    confidence: 80,
    reason: 'Natural and balanced color combination'
  },
  yellow: {
    matching: ['white', 'gray', 'navy', 'blue', 'brown'],
    confidence: 75,
    reason: 'Bright and cheerful combination that creates visual interest'
  },
  purple: {
    matching: ['white', 'gray', 'black', 'beige', 'navy'],
    confidence: 80,
    reason: 'Rich and elegant color pairing'
  },
  pink: {
    matching: ['white', 'gray', 'navy', 'beige', 'brown'],
    confidence: 85,
    reason: 'Soft and feminine combination that creates a balanced look'
  },
  orange: {
    matching: ['white', 'blue', 'brown', 'beige', 'navy'],
    confidence: 75,
    reason: 'Warm and energetic color pairing'
  },
  brown: {
    matching: ['white', 'beige', 'blue', 'green', 'any'],
    confidence: 85,
    reason: 'Earthy tone that works well with both neutrals and colors'
  },
  gray: {
    matching: ['any'],
    confidence: 90,
    reason: 'Neutral that enhances other colors while maintaining balance'
  },
  beige: {
    matching: ['any'],
    confidence: 90,
    reason: 'Versatile neutral that creates a cohesive look'
  }
};

// Category compatibility rules
const CATEGORY_COMBINATIONS: Record<string, string[]> = {
  'Tops': ['Pants', 'Skirts', 'Shorts'],
  'T-shirts': ['Pants', 'Skirts', 'Shorts'],
  'Shirts': ['Pants', 'Skirts', 'Shorts'],
  'Sweaters': ['Pants', 'Skirts', 'Shorts'],
  'Pants': ['Tops', 'T-shirts', 'Shirts', 'Sweaters'],
  'Skirts': ['Tops', 'T-shirts', 'Shirts', 'Sweaters'],
  'Shorts': ['Tops', 'T-shirts', 'Shirts', 'Sweaters'],
  'Dresses': [],  // Dresses are standalone
  'Jackets': ['any'],  // Jackets can go with anything
  'Shoes': ['any']  // Shoes can go with anything
};

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

  getOutfitRecommendations: async (baseItem: ClothingItem) => {
    try {
      // Get all clothing items
      const allItems = await wardrobeService.getAllClothingItems();
      const recommendations = [];
      
      // Get base item's primary color
      const baseColor = baseItem.colors[0].toLowerCase();
      const colorMatch = COLOR_COMBINATIONS[baseColor as keyof typeof COLOR_COMBINATIONS] || {
        matching: ['any'],
        confidence: 70,
        reason: 'Basic color coordination'
      };

      // Filter items by category compatibility and color matching
      const compatibleCategories = CATEGORY_COMBINATIONS[baseItem.category] || [];
      const matchingItems = allItems.filter(item => {
        // Don't match with itself
        if (item.id === baseItem.id) return false;

        // Check category compatibility
        if (compatibleCategories.length > 0 && !compatibleCategories.includes('any')) {
          if (!compatibleCategories.includes(item.category)) return false;
        }

        // Check color compatibility
        const itemColor = item.colors[0].toLowerCase();
        return colorMatch.matching.includes('any') || colorMatch.matching.includes(itemColor);
      });

      // Sort by color match confidence and pick top 3
      const sortedItems = matchingItems.sort((a, b) => {
        const aColor = a.colors[0].toLowerCase();
        const bColor = b.colors[0].toLowerCase();
        const aConfidence = COLOR_COMBINATIONS[aColor as keyof typeof COLOR_COMBINATIONS]?.confidence || 70;
        const bConfidence = COLOR_COMBINATIONS[bColor as keyof typeof COLOR_COMBINATIONS]?.confidence || 70;
        return bConfidence - aConfidence;
      });

      // Create outfit recommendations (max 3)
      for (let i = 0; i < Math.min(3, sortedItems.length); i++) {
        const matchingItem = sortedItems[i];
        const matchColor = matchingItem.colors[0].toLowerCase();
        const confidence = Math.min(
          colorMatch.confidence,
          COLOR_COMBINATIONS[matchColor as keyof typeof COLOR_COMBINATIONS]?.confidence || 70
        );

        let reason = colorMatch.reason;
        if (baseItem.category === 'Tops' && matchingItem.category === 'Pants') {
          reason += ' Perfect for a casual or business look.';
        } else if (baseItem.category === 'Dresses' && matchingItem.category === 'Shoes') {
          reason += ' Great choice for completing the outfit.';
        }

        recommendations.push({
          id: `recommendation-${i}`,
          baseItem: baseItem,
          matchingItem: matchingItem,
          confidence,
          reason
        });
      }

      return recommendations;
    } catch (error) {
      console.error('Error generating outfit recommendations:', error);
      throw error;
    }
  }
};
