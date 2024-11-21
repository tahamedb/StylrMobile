import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface PostProps {
  username: string;
  userAvatar: any;
  image?: any;
  likes: number;
  caption: string;
  timeAgo: string;
}

export function Post({ username, userAvatar, image, likes, caption, timeAgo }: PostProps) {
  const theme = useColorScheme() ?? 'light';
  const iconColor = Colors[theme].icon;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={userAvatar} style={styles.avatar} />
          <ThemedText type="defaultSemiBold">{username}</ThemedText>
        </View>
        <TouchableOpacity>
          <IconSymbol name="ellipsis" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      {image && (
        <Image source={image} style={styles.postImage} resizeMode="cover" />
      )}

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="heart" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="bubble.right" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="paperplane.fill" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <IconSymbol name="bookmark" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      <ThemedText type="defaultSemiBold" style={styles.likes}>
        {likes.toLocaleString()} likes
      </ThemedText>

      <View style={styles.captionContainer}>
        <ThemedText type="defaultSemiBold" style={styles.username}>
          {username}
        </ThemedText>
        <ThemedText>{caption}</ThemedText>
      </View>

      <ThemedText style={styles.timeAgo}>{timeAgo}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  likes: {
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 6,
    marginBottom: 4,
  },
  username: {
    marginRight: 4,
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 12,
  },
}); 