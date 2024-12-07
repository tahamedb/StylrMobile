import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image as RNImage,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import className from "twrnc";
import ArrowBack from "@/components/ui/ArrowBack";
import ImageIcon from "@/assets/icons/Image";
import ButtonPost from "@/components/ui/Button";
import { postsService } from "@/services/posts/postsServices";
import { PostCreation } from "@/types/api.types";

export default function CreatePost() {
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Gestion de la sélection d'image
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
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  // Gestion de la soumission du formulaire
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

      // Nettoyage  après soumission
      setContent("");
      setImageUrl(null);
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
      console.error(error);
    }
  };

  return (
    <View style={className`flex-1 p-5 gap-5`}>
      <View style={className`flex-row justify-between items-center`}>
        <ArrowBack />
        <Text style={className`text-2xl font-bold`}>Create Post</Text>
        <View></View>
      </View>
      <View style={className`flex-row justify-start items-center gap-3`}>
        <RNImage
          source={require("@/assets/images/user.png")}
          style={className`h-10 w-10 rounded-xl`}
        />
        <View>
          <Text style={className`font-semibold text-lg`}>Ibtissam Hadiq</Text>
          <Text style={className`font-semibold text-lg text-gray-700`}>
            Public
          </Text>
        </View>
      </View>
      <TextInput
        placeholder="What's on your mind?"
        style={className`p-3 border border-gray-300 rounded-xl font-semibold text-md text-gray-500`}
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity
        onPress={pickImage}
        style={className`flex-row items-center gap-3 p-3`}
      >
        <ImageIcon />
        <Text style={className`text-lg font-semibold text-gray-500`}>
          Select an Image
        </Text>
      </TouchableOpacity>
      {imageUrl && (
        <RNImage
          source={{ uri: imageUrl }}
          style={className`w-full h-40 rounded-xl border border-gray-300`}
        />
      )}
      <ButtonPost
        title="Post"
        OnPress={handleSubmit}
        href={"/(tabs)/homeScreen"}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
