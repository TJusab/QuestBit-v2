import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router'; 
import PixelButton from "./PixelButton";

const NoQuestBits: React.FC = () => {

  const handlePress = () => {
    router.push('/pages/create_questbit'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>No questbits havec been made for this quest yet !</Text>
      <View className="flex-row">
          <PixelButton text="CREATE!" onPress={handlePress} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'ZCOOL'
  },
});

export default NoQuestBits;
