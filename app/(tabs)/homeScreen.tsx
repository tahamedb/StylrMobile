import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { StoryBar } from '@/components/StoryBar';
import { Post } from '@/components/Post';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {RefreshControl, ScrollView} from "react-native";

const DUMMY_POSTS = [
    {
        id: '1',
        username: 'johndAA',
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

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <StoryBar />
                    {DUMMY_POSTS.map((post) => (
                        <Post key={post.id} {...post} />
                    ))}
                </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    }
});