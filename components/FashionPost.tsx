import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Collapsible } from '@/components/Collapsible';

interface FashionPost {
  userAvatar: string;
  username: string;
  image: string;
  likes: number;
  description: string;
  outfit: {
    top: string;
    bottom: string;
    shoes: string;
  };
}

export function FashionPost({ post }: { post: FashionPost }) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <ThemedText type="defaultSemiBold">{post.username}</ThemedText>
      </ThemedView>

      <Image source={{ uri: post.image }} style={styles.mainImage} />

      <ThemedView style={styles.actions}>
        <TouchableOpacity>
          <IconSymbol name="heart" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSymbol name="bubble.right" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSymbol name="bookmark" size={24} color="#000000" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={styles.likes}>{post.likes} likes</ThemedText>
      <ThemedText>{post.description}</ThemedText>

      <Collapsible title="Outfit Details">
        <ThemedView style={styles.outfitDetails}>
          <ThemedText>Top: {post.outfit.top}</ThemedText>
          <ThemedText>Bottom: {post.outfit.bottom}</ThemedText>
          <ThemedText>Shoes: {post.outfit.shoes}</ThemedText>
        </ThemedView>
      </Collapsible>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  mainImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  likes: {
    fontWeight: '600',
    marginBottom: 4,
  },
  outfitDetails: {
    gap: 4,
  }
}); 