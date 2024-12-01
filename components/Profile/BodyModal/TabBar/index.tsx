import React from 'react';
import { styles } from './styles';
import { TabBar as RNTabBar } from 'react-native-tab-view';

interface TabBarProps {
  props: any;
}

export const TabBar = ({ props }: TabBarProps) => (
  <RNTabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    labelStyle={styles.tabLabel}
    activeColor="#000000"
    inactiveColor="#666666"
  />
);