import React, { useState } from "react";
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
import { PostCreation } from "@/types/api.types";

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
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ArrowBack />
          <Text style={styles.headerTitle}>Create Post</Text>
          <View></View>
        </View>
        <View style={styles.userInfo}>
          <RNImage
            source={require("@/assets/images/defaultUser.png")}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>Ibtissam Hadiq</Text>
            <Text style={styles.userStatus}>Public</Text>
          </View>
        </View>
        <TextInput
          placeholder="What's on your mind?"
          style={styles.textInput}
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <ImageIcon />
          <Text style={styles.imagePickerText}>Select an Image</Text>
        </TouchableOpacity>
        {isUploading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          imageUrl && (
            <RNImage source={{ uri: imageUrl }} style={styles.selectedImage} />
          )
        )}
        <ButtonPost
          title="Post"
          OnPress={handleSubmit}
          href={"/(tabs)/homeScreen"}
        />
      </View>
    </SafeAreaView>
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
    color: "#666",
  },
  textInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
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
    color: "#555",
  },
  selectedImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
