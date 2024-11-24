import { Platform, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  clothingItem: {
    marginBottom: 4,
  },
  imageContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    width: '100%',
    padding: 8, // Ajoute du padding pour le texte
    overflow: 'hidden',
  },
  imageContainerDark: {
    backgroundColor: '#1C1C1E',
  },
  imageWrapper: {
    width: '100%',
    height: 140,
    marginBottom: 8, // Espace entre l'image et le texte
  },
  adaptiveImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4, // Optionnel : ajoute un léger arrondi à l'image
  },
  brand: {
    fontSize: 11,
    fontWeight: '600',
  },
  date: {
    fontSize: 10,
    marginTop: -7,
    opacity: 0.7,
  }
});
