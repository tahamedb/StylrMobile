import { Platform, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    clothingItem: {
      width: '100%',
      marginBottom: 16,
    },
    imageContainer: {
      width: '40%',
      aspectRatio: 1,
      backgroundColor: '#f5f5f5',
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainerDark: {
      backgroundColor: '#2A2A2A',
    },
    adaptiveImage: {
      width: '90%',
      height: '90%',
      alignSelf: 'center',
      marginVertical: '5%',
      borderRadius: 12,
      backgroundColor: '#f5f5f5',
    },
    brand: {
      fontSize: 12,
      fontWeight: '500',
      marginTop: 12,
      marginLeft: 50,
    },
    date: {
      fontSize: 14,
      color: '#666',
      marginLeft: 4,
      marginTop: 4,
    },
  });