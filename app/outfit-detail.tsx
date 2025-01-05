import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useOutfitDetails } from '../hooks/profile/BodyModal/useOutfitDetails';

export default function OutfitDetailScreen() {
  const { id, isRecommended, outfitData, fromTab } = useLocalSearchParams<{ 
    id: string; 
    isRecommended: string; 
    outfitData: string;
    fromTab: string;
  }>();
  
  // Only try to parse outfit data if we're coming from the recommended tab
  const isFromRecommendedTab = fromTab === 'Recommended';
  const recommendedOutfit = isFromRecommendedTab && outfitData ? JSON.parse(outfitData) : null;
  
  // Only use the hook if we're not coming from the recommended tab
  const { outfit, isLoading, error, deleteOutfit } = !isFromRecommendedTab
    ? useOutfitDetails(Number(id))
    : { outfit: null, isLoading: false, error: null, deleteOutfit: null };

  // Use recommended outfit data if we're coming from the recommended tab
  const displayOutfit = isFromRecommendedTab ? recommendedOutfit : outfit;

  if (isLoading && !isFromRecommendedTab) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: false
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
          <Text style={styles.loadingText}>Loading outfit details...</Text>
        </View>
      </View>
    );
  }

  if (error && !isFromRecommendedTab) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: false
          }}
        />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff3b30" />
          <Text style={styles.errorText}>Failed to load outfit details</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{displayOutfit?.name}</Text>
          <Text style={styles.description}>{displayOutfit?.description}</Text>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Season</Text>
              <Text style={styles.detailValue}>{displayOutfit?.season}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Occasion</Text>
              <Text style={styles.detailValue}>{displayOutfit?.occasion}</Text>
            </View>
            {displayOutfit?.rating && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Rating</Text>
                <Text style={styles.detailValue}>{displayOutfit.rating.toFixed(1)} ★</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isRecommended === '1' ? 'Recommended Items' : 'Items in this Outfit'}
          </Text>
          {isRecommended === '1' ? (
            // Render recommended items list
            <View style={styles.recommendedItems}>
              {recommendedOutfit?.items?.map((item: any) => (
                <View key={item.id} style={styles.recommendedItem}>
                  <View style={styles.itemIconContainer}>
                    <Ionicons 
                      name={
                        item.category === 'top' ? 'shirt-outline' :
                        item.category === 'bottom' ? 'layers-outline' :
                        item.category === 'shoes' ? 'footsteps-outline' :
                        item.category === 'dress' ? 'woman-outline' :
                        'shirt-outline'
                      } 
                      size={24} 
                      color="#0a7ea4" 
                    />
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            // Render actual outfit items
            <View style={styles.items}>
              {displayOutfit?.top && (
                <View style={styles.item}>
                  <View style={styles.itemImageContainer}>
                    {displayOutfit.top.imageUrl ? (
                      <Image source={{ uri: displayOutfit.top.imageUrl }} style={styles.itemImage} />
                    ) : (
                      <View style={styles.itemPlaceholder}>
                        <Ionicons name="shirt-outline" size={24} color="#0a7ea4" />
                      </View>
                    )}
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{displayOutfit.top.name}</Text>
                    <Text style={styles.itemCategory}>Top</Text>
                    <Text style={styles.itemWears}>Worn {displayOutfit.top.wearCount || 0} times</Text>
                  </View>
                </View>
              )}
              {displayOutfit?.bottom && (
                <View style={styles.item}>
                  <View style={styles.itemImageContainer}>
                    {displayOutfit.bottom.imageUrl ? (
                      <Image source={{ uri: displayOutfit.bottom.imageUrl }} style={styles.itemImage} />
                    ) : (
                      <View style={styles.itemPlaceholder}>
                        <Ionicons name="layers-outline" size={24} color="#0a7ea4" />
                      </View>
                    )}
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{displayOutfit.bottom.name}</Text>
                    <Text style={styles.itemCategory}>Bottom</Text>
                    <Text style={styles.itemWears}>Worn {displayOutfit.bottom.wearCount || 0} times</Text>
                  </View>
                </View>
              )}
              {displayOutfit?.shoes && (
                <View style={styles.item}>
                  <View style={styles.itemImageContainer}>
                    {displayOutfit.shoes.imageUrl ? (
                      <Image source={{ uri: displayOutfit.shoes.imageUrl }} style={styles.itemImage} />
                    ) : (
                      <View style={styles.itemPlaceholder}>
                        <Ionicons name="footsteps-outline" size={24} color="#0a7ea4" />
                      </View>
                    )}
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{displayOutfit.shoes.name}</Text>
                    <Text style={styles.itemCategory}>Shoes</Text>
                    <Text style={styles.itemWears}>Worn {displayOutfit.shoes.wearCount || 0} times</Text>
                  </View>
                </View>
              )}
              {displayOutfit?.dress && (
                <View style={styles.item}>
                  <View style={styles.itemImageContainer}>
                    {displayOutfit.dress.imageUrl ? (
                      <Image source={{ uri: displayOutfit.dress.imageUrl }} style={styles.itemImage} />
                    ) : (
                      <View style={styles.itemPlaceholder}>
                        <Ionicons name="woman-outline" size={24} color="#0a7ea4" />
                      </View>
                    )}
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{displayOutfit.dress.name}</Text>
                    <Text style={styles.itemCategory}>Dress</Text>
                    <Text style={styles.itemWears}>Worn {displayOutfit.dress.wearCount || 0} times</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        {!isRecommended && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                if (deleteOutfit) {
                  deleteOutfit();
                }
              }}
            >
              <Ionicons name="trash-outline" size={24} color="#ff3b30" />
              <Text style={styles.deleteButtonText}>Delete Outfit</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#687076',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 16,
  },
  items: {
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
    padding: 16,
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#11181C',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 4,
  },
  itemWears: {
    fontSize: 14,
    color: '#687076',
  },
  recommendedItems: {
    gap: 12,
  },
  recommendedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F4F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFF1F0',
    borderRadius: 12,
  },
  deleteButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ff3b30',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#11181C',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#11181C',
    textAlign: 'center',
  },
}); 