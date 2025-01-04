import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image as RNImage,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ArrowBack from "@/components/ui/ArrowBack";
import ImageIcon from "@/assets/icons/Image";
import ButtonPost from "@/components/ui/Button";
import { postsService } from "@/services/posts/postsServices";
import { PostCreation, User } from "@/types/api.types";
import { userService } from "@/services/user/userService";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";

// Cloudinary configuration
const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUDINARY_URL || !UPLOAD_PRESET) {
  throw new Error(
    "Cloudinary configuration is missing. Please check your environment variables."
  );
}

// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (
  imageBase64: string
): Promise<string> => {
  try {
    const timestamp = new Date().getTime();
    const data = {
      file: `data:image/jpeg;base64,${imageBase64}`,
      upload_preset: UPLOAD_PRESET,
      folder: "wewear_uploads",
      filename_override: `image_${timestamp}`,
    };

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary error:", errorData);
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("Upload successful:", result);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export default function CreatePost() {
  const { colors } = useTheme();
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
        Alert.alert('Error', 'Failed to load user information');
      }
    };

    fetchCurrentUser();
  }, []);

  // Image Picker
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permissions to access the gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Required to get Base64 for upload
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setIsUploading(true);
      try {
        const uploadedImageUrl = await uploadImageToCloudinary(
          result.assets[0].base64
        );
        setImageUrl(uploadedImageUrl);
        Alert.alert("Success", "Image uploaded successfully!");
      } catch (error) {
        Alert.alert("Error", "Failed to upload image to Cloudinary");
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Submit Post
  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Content cannot be empty");
      return;
    }

    if (!imageUrl) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    const post: PostCreation = {
      content,
      imageUrl,
    };

    try {
      const createdPost = await postsService.createPost(post);
      Alert.alert("Success", "Post created successfully!");
      console.log(createdPost);

      // Reset after submission
      setContent("");
      setImageUrl(null);
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
      console.error(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <ArrowBack />
        <ThemedText style={styles.headerTitle}>Create Post</ThemedText>
        <View></View>
      </View>

      <View style={styles.userInfo}>
        <RNImage
          source={currentUser?.profileImage 
            ? { uri: currentUser.profileImage }
            : require("@/assets/images/defaultUser.png")}
          style={styles.userImage}
        />
        <View>
          <ThemedText style={styles.userName}>{currentUser?.username || 'Loading...'}</ThemedText>
          <ThemedText style={[styles.userStatus, { color: colors.text }]}>Public</ThemedText>
        </View>
      </View>

      <TextInput
        placeholder="What's on your mind?"
        placeholderTextColor={colors.text + '80'}
        style={[styles.textInput, { 
          borderColor: colors.border,
          color: colors.text,
          backgroundColor: colors.card
        }]}
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <ImageIcon />
        <ThemedText style={styles.imagePickerText}>Select an Image</ThemedText>
      </TouchableOpacity>

      {isUploading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        imageUrl && (
          <RNImage 
            source={{ uri: imageUrl }} 
            style={[styles.selectedImage, { borderColor: colors.border }]} 
          />
        )
      )}

      <ButtonPost
        title="Post"
        OnPress={handleSubmit}
        href={"/(tabs)/homeScreen"}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  userName: {
    fontWeight: "600",
    fontSize: 18,
  },
  userStatus: {
    fontWeight: "600",
    fontSize: 18,
  },
  textInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  imagePickerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  selectedImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
  },
});
