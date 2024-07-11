import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import QuestDetail from "../../components/QuestDetail";
import { useLocalSearchParams } from 'expo-router';

const QuestDetails = () => {
  const { quest } = useLocalSearchParams(); 
  const item = quest ? JSON.parse(quest) : null;
  
  useEffect(() => {
    if (item) {
      console.log('Parsed item:', item);
    }
  }, [item]);

  return (
    <View style={styles.container}>
      <QuestDetail item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

export default QuestDetails;
