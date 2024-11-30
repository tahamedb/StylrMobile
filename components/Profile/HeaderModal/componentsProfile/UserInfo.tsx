import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { UserInfoProps } from '../types';

export const UserInfo: React.FC<UserInfoProps> = ({
  user,
  isPrivate,
  onToggleVariant,
}) => {
  return (
    <View style={styles.userSection}>
      <Image 
        source={
          typeof user.profileImage === 'string' 
            ? { uri: user.profileImage } 
            : user.profileImage
        }
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.username}</Text>
        {isPrivate && (
          <TouchableOpacity 
            onPress={onToggleVariant}
            activeOpacity={0.7}
          >
            <Text style={styles.publicLink}>Voir le profil public.</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};