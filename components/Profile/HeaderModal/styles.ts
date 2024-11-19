import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  // TopBar Styles
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    fontSize: 26,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
  },
  iconButton: {
    padding: 8,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  titlePublic: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 32,
  },
  // User Section

  userSection: {
    paddingHorizontal: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  publicLink: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
  // Weather Section
  weatherSection: {
    marginTop: 10,
  },
  weatherScrollContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
  },
  weatherCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 10,
    width: 340,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  todayBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  todayText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  tempContainer: {
    marginTop: 4,
  },
  tempText: {
    fontSize: 20,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 18,
    color: '#666',
  },
  calendarLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  calendarText: {
    fontSize: 16,
    color: '#007AFF',
  },
  // Public Profile Styles
  publicContent: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  bioPrompt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 6,
    borderRadius: 8,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: '#000',
  },
  closeIcon: {
    fontSize: 24,
    color: '#666',
    padding: 4,
  },
  statsSection: {
    gap: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 32,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statsAndSettings: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligne stats et bouton de manière équidistante
    alignItems: 'center', // Centre verticalement stats et bouton
    marginTop: 1,
    gap: 16, // Ajoute un espace entre statsSection et settingsButton
  },
  
  settingsButton: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  settingsText: {
    fontSize: 16,
    color: '#000',
  },
});