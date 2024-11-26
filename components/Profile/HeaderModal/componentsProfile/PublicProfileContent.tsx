import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { PublicProfileContentProps } from '../types';

export const PublicProfileContent: React.FC<PublicProfileContentProps> = ({
  user,
  followersCount,
  followingsCount,
  onSettingsPress
}) => {
  return (
    <View style={styles.publicContent}>
      <TouchableOpacity style={styles.bioPrompt}>
        <Text style={styles.bioText}>
          {user.bio || 'Ajoutez une présentation'}
        </Text>
        <Text style={styles.closeIcon}>×</Text>
      </TouchableOpacity>

      <View style={styles.statsAndSettings}>
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <StatItem
              value={followersCount}
              label="Abonné(e)"
            />
            <StatItem
              value={followingsCount}
              label="S'abonner"
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={onSettingsPress}
          activeOpacity={0.7}
        >
          <Text style={styles.settingsText}>
            Paramètres du profil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StatItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);