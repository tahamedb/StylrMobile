// useUsers.ts
import { useState, useEffect } from 'react';
import { User } from '@/types/api.types';
import { userService } from '@/services/user/userService';

export function useUsers(searchQuery: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim()) {
        setUsers([]);
        return;
      }
      
      setLoading(true);
      try {
        console.log('Searching for:', searchQuery);
        const response = await userService.searchUsers(searchQuery);
        console.log('Search response:', response);
        setUsers(response);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search users');
      } finally {
        setLoading(false);
      }
    };

    searchUsers();
  }, [searchQuery]);

  return { users, loading, error };
}
