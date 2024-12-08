import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Lock, AlertCircle, Shirt } from 'lucide-react-native';
import { useWardrobe } from '@/hooks/profile/BodyModal/useWardrobe';
import { useProfile } from '@/hooks/profile/HeaderModal/useProfile';
import { styles } from './styles';
import { useRouter } from 'expo-router';

export const Wardrobe = ({ variant }: { variant: 'private' | 'public' }) => {
 const router = useRouter();
 const { user } = useProfile(1);
 const { wardrobeData, wardrobes, isLoading, error, setSelectedCategory } = useWardrobe();
 const totalItems = wardrobeData?.length || 0;
 const previewItems = wardrobeData?.slice(0, 4) || [];

 const filteredWardrobes = variant === 'public' 
   ? wardrobes.filter(wardrobe => wardrobe.isPublic)
   : wardrobes;
 
 if (variant === 'public' && filteredWardrobes.length === 0) {
   return (
     <View style={styles.emptyContainer}>
       <Shirt  size={48} color="#666" />
       <Text style={styles.emptyText}>
         Aucune garde-robe de {user?.username || 'cet utilisateur'}
       </Text>
     </View>
   );
 }

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

 const handleWardrobePress = (wardrobeId?: string) => {
   if (wardrobeId) {
     router.push({ pathname: '/wardrobe', params: { id: wardrobeId } });
   } else {
     router.push('/wardrobe');
   }
 };

 return (
   <View style={styles.container}>
     <View style={styles.grid}>
       {/* Tous les vêtements */}
       {variant === 'private' && (
         <TouchableOpacity 
           style={styles.gridItem}
           onPress={() => handleWardrobePress()}
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
       )}

       {/* Garde-robes créées */}
       {filteredWardrobes.map((wardrobe) => (
         <TouchableOpacity
           key={wardrobe.id}
           style={styles.gridItem}
           onPress={() => handleWardrobePress(wardrobe.id)}
         >
           <View style={styles.previewGrid}>
             {wardrobe.items.slice(0, 4).map((item, index) => (
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
             <Text style={styles.itemTitle}>{wardrobe.name}</Text>
             <View style={styles.countContainer}>
               <Lock size={16} color="#666" />
               <Text style={styles.countText}>{wardrobe.itemCount}</Text>
             </View>
           </View>
         </TouchableOpacity>
       ))}

       {/* Créer une garde-robe */}
       {variant === 'private' && (
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
       )}
     </View>
   </View>
 );
};