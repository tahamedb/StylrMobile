import React, { Dispatch, SetStateAction } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const dummyUsers = [
  { id: '1', name: 'John Doe', avatar: require('../assets/images/react-logo.png') },
  { id: '2', name: 'Jane Smith', avatar: require('../assets/images/react-logo.png') },
  { id: '3', name: 'Alice Johnson', avatar: require('../assets/images/react-logo.png') },
  { id: '4', name: 'Bob Brown', avatar: require('../assets/images/react-logo.png') },
  { id: '5', name: 'Charlie Green', avatar: require('../assets/images/react-logo.png') },
];

// Définition des props du composant
interface SearchBarWithListProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  navigation: any; 
}

export function SearchBarWithList({ searchQuery, setSearchQuery, navigation }: SearchBarWithListProps) {
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
      {/* Barre de recherche */}
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

      {/* Liste filtrée des utilisateurs */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => navigation.navigate('UserDetails', { userId: item.id })}
          >
            <Image source={item.avatar} style={styles.avatar} />
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
 