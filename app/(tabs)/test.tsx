import {Image, StyleSheet, Platform, View, FlatList, ActivityIndicator} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState} from "react";
import {usePosts} from "@/hooks/usePosts";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Test() {
    const { posts, loading, error, refetch } = usePosts();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refetch(); // Trigger data fetching from the API
        } finally {
            setRefreshing(false);
        } {
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                <ThemedText className="mt-2">Loading posts...</ThemedText>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <ThemedText className="text-red-500">Error: {error.message}</ThemedText>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ThemedView className="flex-1">
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="p-4 border-b border-gray-200">
                            <ThemedText className="font-bold text-lg">{item.title}</ThemedText>
                            <ThemedText className="mt-2">{item.body}</ThemedText>
                        </View>
                    )}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center p-4">
                            <ThemedText>No posts found</ThemedText>
                        </View>
                    }
                />
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
