import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  clothingItem: {
    marginBottom: 4,
  },
  imageContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    width: '100%',
    padding: 8,
    overflow: 'hidden',
    position: 'relative', // Ajouté pour le positionnement du checkmark
  },
  imageContainerDark: {
    backgroundColor: '#1C1C1E',
  },
  imageWrapper: {
    width: '100%',
    height: 140,
    marginBottom: 8,
  },
  adaptiveImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  brand: {
    fontSize: 11,
    fontWeight: '600',
  },
  date: {
    fontSize: 10,
    marginTop: -7,
    opacity: 0.7,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  checkmarkSelected: {
    // Styles supplémentaires pour l'état sélectionné si nécessaire
  }
});