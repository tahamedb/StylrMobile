import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    tabText: {
      fontSize: 16,
      opacity: 0.7,
    },
    activeTabText: {
      opacity: 1,
      fontWeight: '500',
    }
  });