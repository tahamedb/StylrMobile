import React, { Dispatch, SetStateAction } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const dummyUsers = [
  { id: '1', name: 'John Doe', profileImage: require('../assets/images/react-logo.png') },
  { id: '2', name: 'Jane Smith', profileImage: require('../assets/images/react-logo.png') },
  { id: '3', name: 'Alice Johnson', profileImage: require('../assets/images/react-logo.png') },
  { id: '4', name: 'Bob Brown', profileImage: require('../assets/images/react-logo.png') },
  { id: '5', name: 'Charlie Green', profileImage: require('../assets/images/react-logo.png') },
];

// Définition des props du composant
interface SearchBarWithListProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export function SearchBarWithList({ searchQuery, setSearchQuery }: SearchBarWithListProps) {
  const router = useRouter();
  
  // Filtrer les utilisateurs uniquement si une recherche est effectuée
  const filteredUsers = searchQuery.trim()
    ? dummyUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.id.includes(searchQuery)
      )
    : [];

  const handleUserPress = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or ID"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          keyboardType="default"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => handleUserPress(item.id)}
          >
            <Image source={item.profileImage} style={styles.avatar} />
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
          searchQuery.trim() ? (
            <Text style={styles.noResultsText}>No users found</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInput: {
    fontSize: 16,
    height: 40,
    color: '#000',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    color: '#333',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});