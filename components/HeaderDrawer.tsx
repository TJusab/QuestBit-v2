import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderDrawerProps {
  title: string;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({ title }) => {
  return (
    <View>
      <Text className="font-press text-3xl">{title}</Text>
    </View>
  );
};

export default HeaderDrawer;
