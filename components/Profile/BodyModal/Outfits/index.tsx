import React, { useState } from 'react';
import { View } from 'react-native';
import { useOutfits } from '@/hooks/profile/BodyModal/useOutfits';
import { useProfile } from '@/hooks/profile/HeaderModal/useProfile';
import { OutfitTabs } from './OutfitTabs';
import { OutfitIdeas } from './OutfitIdeas';
import { DailyOutfit } from './DailyOutfit';
import { Recommendations } from './Recommendations';
import { styles } from './styles';
import { OutfitsProps, TabType } from '@/types/api.types';

export const Outfits: React.FC<OutfitsProps> = ({ variant }) => {
  const { user } = useProfile(1);
  const { outfitsData } = useOutfits();
  const [activeTab, setActiveTab] = useState<TabType>('Idées');

  const renderContent = () => {
    switch (activeTab) {
      case 'Idées':
        return <OutfitIdeas variant={variant} username={user?.username} />;
      case 'Tenue du jour':
        return <DailyOutfit outfitsData={outfitsData} />;
      case 'Recommandation':
        return variant === 'private' ? <Recommendations /> : null;
      default:
        return <OutfitIdeas variant={variant} username={user?.username} />;
    }
  };

  return (
    <View style={styles.container}>
      <OutfitTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        variant={variant}
      />
      {renderContent()}
    </View>
  );
};