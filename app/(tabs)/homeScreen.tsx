import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { SearchBarWithList } from '@/components/SearchBarWithList';
import { Post } from '@/components/Post';
import { SafeAreaView, StyleSheet, FlatList, RefreshControl } from 'react-native';

const DUMMY_POSTS = [
  {
    id: '1',
    username: 'johndoe',
    userAvatar: require('@/assets/images/react-logo.png'),
    image: require('@/assets/images/react-logo.png'),
    likes: 1234,
    caption: 'Having a great time coding with React Native! 🚀 #coding #reactnative',
    timeAgo: '2 hours ago',
  },
  {
    id: '2',
    username: 'janedoe',
    userAvatar: require('@/assets/images/react-logo.png'),
    image: require('@/assets/images/react-logo.png'),
    likes: 856,
    caption: 'Beautiful sunset today 🌅 #nature #photography',
    timeAgo: '4 hours ago',
  },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        {/* Utilisez FlatList */}
        <FlatList
          data={DUMMY_POSTS} // Afficher tous les posts sans filtrage
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post key={item.id} {...item} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            <SearchBarWithList 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          }
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
