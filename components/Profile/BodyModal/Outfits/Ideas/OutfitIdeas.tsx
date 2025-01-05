import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BookPlus, Shirt } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';

interface OutfitIdeasProps {
  variant: 'private' | 'public';
  username?: string;
}

export function OutfitIdeas({ variant, username = '' }: OutfitIdeasProps) {
  const router = useRouter();

  const handleCreateOutfit = () => {
    router.push('/create-outfit');
  };

  const handleCreateIdeasBook = () => {
    // TODO: Implement ideas book creation
    console.log('Create ideas book');
  };

  if (variant === 'private') {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.createBox}
            onPress={handleCreateOutfit}
          >
            <View style={styles.iconContainer}>
              <Shirt 
                size={48} 
                color="#9E9E9E" 
              />
            </View>
            <Text style={styles.createText}>Créer une tenue</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.createBox}
            onPress={handleCreateIdeasBook}
          >
            <View style={styles.iconContainer}>
              <BookPlus 
                size={48} 
                color="#9E9E9E" 
              />
            </View>
            <Text style={styles.createText}>Créer un livre d'idées</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>
        {username} n'a pas encore créé d'idées
      </Text>
    </View>
  );
} 