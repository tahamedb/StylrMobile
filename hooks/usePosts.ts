import { useState, useEffect } from 'react';
import { Post } from '@/types/api.types';
import { postsService } from '@/services/posts/postsServices';

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await postsService.getPosts();
            setPosts(response);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, setPosts, loading, error, refetch: fetchPosts };
}