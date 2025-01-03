import { useState, useEffect } from 'react';
import { Post } from '@/types/api.types';
import { postsService } from '@/services/posts/postsServices';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsService.getPosts();
      if (Array.isArray(response)) {
        setPosts(response);
      } else {
        setError("Format de réponse inattendu");
      }
    } catch (err) {
      setError("Impossible de charger les posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, setPosts, loading, error, fetchPosts };
};