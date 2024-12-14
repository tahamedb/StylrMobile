// useUsers.ts
import { useState, useEffect } from 'react';
import { fetchUsers,User } from '@/services/searchUsers/userServicesSearch';
export function useUsers(searchQuery: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers(); 
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []); 

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { filteredUsers, loading, error };
}
