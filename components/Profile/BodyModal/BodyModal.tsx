import React from 'react';
import { View } from 'react-native';
import { useTabContext } from './TabContext';
import { TabBar } from './common/TabBar';
import { PublicGardeRobe } from './PublicProfile/PublicGardeRobe';
import { PrivateGardeRobe } from './PrivateProfile/PrivateGardeRobe';
import { EmptyTab } from './EmptyTab';


type Props = {
  variant: 'public' | 'private';
};

export const BodyModal: React.FC<Props> = ({ variant }) => {
  const { activeTab } = useTabContext();

  const renderContent = () => {
    switch(activeTab) {
      case 'garde-robe':
        return variant === 'public' ? <PublicGardeRobe /> : <PrivateGardeRobe />;
      case 'tenue':
      case 'emballage':
        return <EmptyTab />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <TabBar />
      {renderContent()}
    </View>
  );
};