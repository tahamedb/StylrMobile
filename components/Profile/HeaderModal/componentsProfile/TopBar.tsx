import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BellIcon, BookmarkIcon, ChevronLeftIcon } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { styles } from '../styles';
import { TopBarProps } from '../types';

export const TopBar: React.FC<TopBarProps> = ({
  isPrivate,
  onToggleVariant,
  onNotificationPress,
  onBookmarkPress,
}) => {
  const renderPrivateContent = () => (
    <>
      <Text style={styles.logo}>WeWear</Text>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.iconButton}
          activeOpacity={0.7}
          accessible={true}
          accessibilityLabel="Notifications"
          onPress={onNotificationPress}
        >
          <BellIcon size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          activeOpacity={0.7}
          accessible={true}
          accessibilityLabel="Favoris"
          onPress={onBookmarkPress}
        >
          <BookmarkIcon size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderPublicContent = () => (
    <>
      <TouchableOpacity 
        onPress={onToggleVariant}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <ChevronLeftIcon size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.titlePublic}>Profil public</Text>
    </>
  );

  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut} 
      style={styles.topBar}
    >
      {isPrivate ? renderPrivateContent() : renderPublicContent()}
    </Animated.View>
  );
};