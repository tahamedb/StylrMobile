import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // Ajoute un padding top pour éviter le status bar
    paddingTop: 52,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    // Ajoute une marge en haut et une ombre
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
    marginLeft: -4, // Pour aligner avec le padding du container
  },
  searchBarContainer: {
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    paddingLeft: 16,
    borderRadius: 8,
    fontSize: 16,
    height: 48, // Hauteur fixe pour un meilleur alignement
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 8,
    color: '#333333',
  },
  loader: {
    padding: 20,
  },
});