import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export default function UploadScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [detectedClothing, setDetectedClothing] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;
  const [isLoading, setIsLoading] = useState(false);

  const handleImageCapture = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        setIsLoading(true);
        const imageUri = result.assets[0].uri;
        
        const manipResult = await manipulateAsync(
          imageUri,
          [{ resize: { width: 1080 } }],
          { compress: 0.7, format: SaveFormat.JPEG }
        );

        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        setImage(imageUri);
        router.push({
          pathname: '/clothes-details',
          params: { 
            imageBase64: base64
          }
        });
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    handleImageCapture(result);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    handleImageCapture(result);
  };

  const detectClothing = async (imageUri: string) => {
    // Mock detection - replace with actual AI detection service
    setDetectedClothing('Hoodie');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Add New Item</ThemedText>
        
        {!image ? (
          <ThemedView style={styles.uploadOptions}>
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={takePhoto}
            >
              <IconSymbol name="house.fill" size={32} color={iconColor} />
              <ThemedText>Take Photo</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={pickImage}
            >
              <IconSymbol name="paperplane.fill" size={32} color={iconColor} />
              <ThemedText>Choose from Library</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: image }} style={styles.preview} />
            {detectedClothing && (
              <ThemedView style={styles.detectionResult}>
                <ThemedText type="defaultSemiBold">
                  Detected: {detectedClothing}
                </ThemedText>
              </ThemedView>
            )}
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  uploadOptions: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  uploadButton: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    gap: 12,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 16,
  },
  preview: {
    width: '100%',
    height: 400,
    borderRadius: 12,
  },
  detectionResult: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
}); 