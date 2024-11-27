import { useState, useEffect } from 'react';
import { postsService } from '@/services/posts/postsServices';
import { Post } from '@/types/api.types';

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await postsService.getPosts();
            setPosts(response.posts);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, error, refetch: fetchPosts };
}