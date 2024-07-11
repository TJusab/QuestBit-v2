import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuestDetail from "../../components/QuestDetail";

const QuestDetails = ({ route, navigation }) => {
  const { item } = route.params;

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
