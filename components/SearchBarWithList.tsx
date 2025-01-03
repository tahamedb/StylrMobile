import React, { useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dummyUsers = [
  { id: '1', name: 'John Doe', profileImage: require('../assets/images/react-logo.png') },
  { id: '2', name: 'Jane Smith', profileImage: require('../assets/images/react-logo.png') },
  { id: '3', name: 'Alice Johnson', profileImage: require('../assets/images/react-logo.png') },
  { id: '4', name: 'Bob Brown', profileImage: require('../assets/images/react-logo.png') },
  { id: '5', name: 'Charlie Green', profileImage: require('../assets/images/react-logo.png') },
];

interface SearchBarWithListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBarWithList({ searchQuery, setSearchQuery }: SearchBarWithListProps) {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const filteredUsers = searchQuery.trim()
    ? dummyUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleUserPress = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </View>

      {isFocused && searchQuery.trim() !== '' && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.userItem}
                onPress={() => handleUserPress(item.id)}
              >
                <Image source={item.profileImage} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userHandle}>@{item.name.toLowerCase().replace(' ', '')}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.noResults}>No results for "{searchQuery}"</Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: '100%',
  },
  resultsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  userItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e1e8ed',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#14171a',
  },
  userHandle: {
    fontSize: 14,
    color: '#657786',
  },
  noResults: {
    padding: 16,
    textAlign: 'center',
    color: '#657786',
  },
});