import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NoQuests: React.FC = () => {

  return (
    <View className='flex-1 justify-center items-center'>
        <Image
              source={require("../assets/images/treasure_map.png")}
              style={{ width: 200, height: 200 }}
        />
        <Text className='font-zcool text-xl text-gray-100'>You have no current quests.</Text>
        <Text className='font-zcool text-xl text-gray-100'>Start your adventure by creating one!</Text>
    </View>
  );
};

export default NoQuests;
