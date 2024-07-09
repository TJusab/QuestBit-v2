import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderDrawer = ({ title }) => {
  return (
    <View>
      <Text className="font-press text-3xl">{title}</Text>
    </View>
  );
};

export default HeaderDrawer;
