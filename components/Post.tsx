import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { getRelativeTime } from '@/utils/dateUtils';

interface PostProps {
  username: string;
  userAvatar: any;
  image?: any;
  likes: number;
  caption: string;
  timeAgo: string;
  onComment?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
  commentCount?: number;
  comments?: Array<{
    id: number;
    content: string;
    username: string;
    createdAt: string;
  }>;
}

export function Post({ 
  username, 
  userAvatar, 
  image, 
  likes, 
  caption, 
  timeAgo,
  onComment,
  onLike,
  onShare,
  isLiked = false,
  commentCount = 0,
  comments = []
}: PostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    onLike?.();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={userAvatar} style={styles.avatar} />
          <View>
            <ThemedText type="defaultSemiBold">{username}</ThemedText>
            <ThemedText style={styles.timeAgo}>{getRelativeTime(timeAgo)}</ThemedText>
          </View>
        </View>
        <TouchableOpacity>
          <AntDesign name="ellipsis1" size={24} color="#536471" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.caption}>{caption}</ThemedText>
        {image && (
          <Image 
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <AntDesign name="message1" size={20} color="#536471" />
          <ThemedText style={styles.actionText}>{commentCount}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="retweet" size={20} color="#536471" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <AntDesign 
            name={liked ? "heart" : "hearto"} 
            size={20} 
            color={liked ? "#F91880" : "#536471"} 
          />
          <ThemedText style={styles.actionText}>{likesCount}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <AntDesign name="sharealt" size={20} color="#536471" />
        </TouchableOpacity>
      </View>

      {comments && comments.length > 0 && (
        <View style={styles.commentsSection}>
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <Text style={styles.commentTime}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
    paddingVertical: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  timeAgo: {
    fontSize: 14,
    color: '#536471',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  caption: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 4,
  },
  actionText: {
    color: '#536471',
    fontSize: 13,
    marginLeft: 4,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFF3F4',
    marginTop: 8,
  },
  commentContainer: {
    marginBottom: 8,
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 18,
  },
  commentTime: {
    fontSize: 12,
    color: '#536471',
    marginTop: 2,
  },
}); 