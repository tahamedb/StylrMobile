import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedView } from './ThemedView';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Données fictives
const dummyData = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Bob Brown' },
  { id: '5', name: 'Charlie Green' },
];

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const [filteredData, setFilteredData] = useState(dummyData);

  // Fonction pour gérer la recherche
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData([]); // Réinitialise la liste à vide si la recherche est vide
    } else {
      const filtered = dummyData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
          keyboardType="default"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Liste filtrée : s'affiche uniquement si la recherche a des résultats */}
      {searchQuery.trim() !== '' && filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginTop: 50, // Déplace la barre vers le bas
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    height: 40,
    color: '#000',
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultText: {
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
