import React, { Dispatch, SetStateAction } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

// Dummy data (données fictives)
const dummyUsers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Bob Brown' },
  { id: '5', name: 'Charlie Green' },
];

// Définition des props du composant
interface SearchBarWithListProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export function SearchBarWithList({ searchQuery, setSearchQuery }: SearchBarWithListProps) {
  // Filtrer les utilisateurs uniquement si une recherche est effectuée
  const filteredUsers = searchQuery.trim()
    ? dummyUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.id.includes(searchQuery)
      )
    : [];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
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

      {/* Filtered User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
