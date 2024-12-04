import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useOutfits } from '@/hooks/profile/BodyModal/useOutfits';
import { styles } from './styles';

export const Outfits = () => {
  const { outfitsData } = useOutfits();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
  onPress={() => console.log('Pressed!')}
  style={{
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    margin: 20
  }}
>
  <Text style={{ color: 'white', fontSize: 16 }}>Test Clic</Text>
</TouchableOpacity> 
   </View>
  );
};