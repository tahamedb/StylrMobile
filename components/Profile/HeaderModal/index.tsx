import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { HeaderModalProps } from './types';
import { TopBar } from './componentsProfile/TopBar';
import { UserInfo } from './componentsProfile/UserInfo';
import { WeatherSection } from './componentsProfile/WeatherSection';
import { PublicProfileContent } from './componentsProfile/PublicProfileContent';

export const HeaderModal: React.FC<HeaderModalProps> = ({
  variant,
  user,
  location,
  weather,
  onToggleVariant,
  onCalendarPress,
  onSettingsPress,
  onNotificationPress,
  onBookmarkPress,
}) => {
  const isPrivate = variant === 'private';

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <TopBar 
        isPrivate={isPrivate}
        onToggleVariant={onToggleVariant}
        onNotificationPress={onNotificationPress}
        onBookmarkPress={onBookmarkPress}
      />
      {/* UserInfo */}
      <UserInfo 
        user={user}
        isPrivate={isPrivate}
        onToggleVariant={onToggleVariant}
      />

    {/* Weather section for private profile */}
    {isPrivate && weather && (
        <WeatherSection 
          weather={weather}
          location={location}
          variant={variant}
          onCalendarPress={onCalendarPress}
        />
      )}

      {/* Public Profile Content */}
      {!isPrivate && (
        <PublicProfileContent 
          user={user}
          followersCount={user.followers.length}
          followingsCount={user.followings.length}
          onSettingsPress={onSettingsPress}
        />
      )}
    </View>
  );
};