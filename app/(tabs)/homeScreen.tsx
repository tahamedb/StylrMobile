import { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  FlatList, 
  RefreshControl, 
  Text, 
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Share,
  Platform,
  Pressable
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SearchBarWithList } from '@/components/SearchBarWithList';
import { Post } from '@/components/Post';
import { usePosts } from '@/hooks/usePosts';
import { Post as PostType } from '@/types/api.types';
import { getRelativeTime } from '@/utils/dateUtils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const BASE_URL = Platform.select({
  ios: 'http://localhost:8088',
  android: 'http://192.168.1.6:8088',
});

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, setPosts, loading, error, refetch } = usePosts();
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleCreatePost = () => {
    router.push('/createPost');
  };

  const handleComment = (postId: number) => {
    setSelectedPostId(postId);
    setCommentModalVisible(true);
  };

  const submitComment = () => {
    if (selectedPostId && commentText.trim()) {
      // Update posts with new comment
      const updatedPosts = posts.map(post => {
        if (post.id === selectedPostId) {
          return {
            ...post,
            comments: [...(post.comments || []), {
              id: Date.now(),
              content: commentText,
              userId: 1, // Replace with actual user ID
              username: 'Current User',
              createdAt: new Date().toISOString()
            }]
          };
        }
        return post;
      });
      
      // Add this line to update the posts state
      setPosts(updatedPosts);
      
      setCommentText('');
      setCommentModalVisible(false);
    }
  };

  const handleShare = async (post: PostType) => {
    try {
      await Share.share({
        message: `${post.content}\n${post.imageUrl || ''}`,
        title: 'Share Post'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderItem = ({ item }: { item: PostType }) => {
    const imageUrl = item.imageUrl || null;
    
    return (
      <Post 
        key={item.id}
        username="Anonymous"
        userAvatar={require('@/assets/images/react-logo.png')}
        image={imageUrl}
        likes={item.likes || 0}
        caption={item.content}
        timeAgo={getRelativeTime(item.createdAt || new Date())}
        onComment={() => handleComment(item.id)}
        onShare={() => handleShare(item)}
        commentCount={item.comments?.length || 0}
        comments={item.comments || []}
      />
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <View style={styles.searchBarContainer}>
            <SearchBarWithList 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          </View>
          <Text style={styles.messageText}>Loading posts...</Text>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <View style={styles.searchBarContainer}>
            <SearchBarWithList 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          </View>
          <Text style={styles.messageText}>{error.message}</Text>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBarWithList 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        </View>
        <FlatList<PostType>
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        <Pressable 
          style={styles.fab}
          onPress={handleCreatePost}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </Pressable>

        <Modal
          visible={commentModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCommentModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Comment</Text>
              <TextInput
                style={styles.commentInput}
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write your comment..."
                multiline
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setCommentModalVisible(false)}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={submitComment}
                >
                  <Text style={styles.submitButtonText}>Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1000,
    position: 'relative',
    paddingTop: 10,
  },
  messageText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 15,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#1D9BF0',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0a7ea4',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});