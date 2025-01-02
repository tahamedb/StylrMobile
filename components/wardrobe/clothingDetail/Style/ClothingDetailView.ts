import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerDark: {
      backgroundColor: '#000',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
    },
    image: {
      width: '100%',
      height: 'auto',
      minHeight: 400,
      backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    loadingText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 16,
    },
    errorContainer: {
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      padding: 12,
      margin: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(255, 0, 0, 0.3)',
    },
    errorText: {
      color: '#D32F2F',
      fontSize: 14,
      textAlign: 'center',
    },
  });