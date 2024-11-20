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
    gap: 1,
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
    alignItems: 'center',
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
    marginTop: 8,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  publicLink: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
  // Weather Section
  weatherSection: {
    marginTop: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginLeft: 16,
   },
   sunIcon: {
    marginLeft: 8,
   },
   calendarContainer: {
    alignSelf: 'center',
    width: 60, 
    height: 60, 
    justifyContent: 'center',
    alignItems: 'center',
   },
   calendarButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    
   },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText1: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  todayBadge: {
    backgroundColor: '#edaa9e',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -7,
    gap: 8,
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
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 1,
    gap: 16, 
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