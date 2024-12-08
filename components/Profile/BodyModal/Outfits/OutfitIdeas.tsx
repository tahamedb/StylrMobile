import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sparkles , BookPlus  } from 'lucide-react-native';
import { styles } from './styles';

interface OutfitIdeasProps {
  variant: 'private' | 'public';
  username?: string;
}

export const OutfitIdeas: React.FC<OutfitIdeasProps> = ({ variant, username = '' }) => {
    if (variant === 'private') {
        return (
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.createIdeaBox}>
              <View style={styles.iconContainer}>
                <BookPlus 
                  size={48} 
                  color="#9E9E9E" 
                />
              </View>
              <Text style={styles.createIdeaText}>Créer un livre d'idées</Text>
            </TouchableOpacity>
          </View>
        );
      }

  return (
    <View style={styles.emptyStateContainer}>
      <Sparkles  size={48} color="#9E9E9E" />
      <Text style={styles.emptyStateText}>
        {username} n'a pas encore créé d'idées
      </Text>
    </View>
  );
};