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
        const response = await userService.searchUsers(searchQuery);
        setUsers(response);
      } catch (err) {
        setError('Failed to search users');
      } finally {
        setLoading(false);
      }
    };

    searchUsers();
  }, [searchQuery]);

  return { users, loading, error };
}
