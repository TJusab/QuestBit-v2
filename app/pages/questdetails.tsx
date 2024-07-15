import { Quest } from "@/constants/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import QuestDetail from "@/components/QuestDetail";

const QuestDetails = () => {
  const parseQuest = (data: string): Quest => {
    console.log("data", data);
    const parsedData = JSON.parse(data);

    if (parsedData.deadline) {
      parsedData.deadline = new Date(parsedData.deadline);
    }
    return parsedData as Quest;
  };
  const { quest } = useLocalSearchParams();
  const item: Quest = parseQuest(quest as string);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

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