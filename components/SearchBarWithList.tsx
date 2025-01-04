import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUsers } from '@/hooks/searchUsers/useUsers';

interface SearchBarWithListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBarWithList({ searchQuery, setSearchQuery }: SearchBarWithListProps) {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const { users, loading } = useUsers(searchQuery);

  useEffect(() => {
    console.log('Users data:', users);
  }, [users]);
  
  const handleUserPress = (userId: number) => {
    try {
      console.log('Before navigation - userId:', userId);
      router.push({
        pathname: '/(modal)/publicProfile/[id]',
        params: { id: userId.toString() }
      });
      console.log('After navigation attempt');
      setIsFocused(false);
      setSearchQuery('');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const onUserPress = (item: any) => {
    console.log('User pressed:', item);
    if (item && item.id) {
      handleUserPress(item.id);
    } else {
      console.error('Invalid user item:', item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholderTextColor="#666"
        />
      </View>

      {isFocused && searchQuery.trim() !== '' && (
        <View style={styles.resultsContainer}>
          {loading ? (
            <Text style={styles.messageText}>Searching...</Text>
          ) : (
            <FlatList
              data={users}
              keyExtractor={(item) => {
                console.log('Item in keyExtractor:', item);
                return item.id.toString();
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.userItem}
                  onPress={() => onUserPress(item)}
                >
                  <Image 
                    source={item.profileImage ? { uri: item.profileImage } : require('@/assets/images/react-logo.png')} 
                    style={styles.avatar}
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.username}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <Text style={styles.messageText}>No users found</Text>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
    elevation: 3,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  resultsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  messageText: {
    padding: 15,
    textAlign: 'center',
    color: '#666',
  },
});