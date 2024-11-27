import { useState, useEffect } from 'react';
import axios from 'axios';  // Si vous préférez utiliser axios, sinon vous pouvez utiliser fetch

interface User {
  id: string;
  name: string;
}

export function useUsers(searchQuery: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Remplacez l'URL par celle de votre API backend
        const response = await axios.get('https://your-api-url.com/users');
        setUsers(response.data); // Ou ajustez selon la structure de votre réponse
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);  // Exécuter au montage du composant

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { filteredUsers, loading, error };
}
