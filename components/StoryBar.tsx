import { ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface Story {
  username: string;
  imageUrl?: any;
  avatar?: string;
  hasUnseenStory?: boolean;
}

interface StoryBarProps {
  stories?: Story[];
}

export function StoryBar({ stories }: StoryBarProps) {
  const dummyStories = stories || Array(5).fill({
    username: 'User',
    imageUrl: require('@/assets/images/react-logo.png')
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dummyStories.map((story, index) => (
          <TouchableOpacity key={index} style={styles.storyItem}>
            <ThemedView style={styles.storyRing}>
              <Image 
                source={story.imageUrl || { uri: story.avatar }}
                style={styles.storyImage}
              />
            </ThemedView>
            <ThemedText style={styles.username}>{story.username}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingVertical: 8,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    padding: 2,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 27,
  },
  username: {
    fontSize: 12,
    marginTop: 4,
  }
}); 