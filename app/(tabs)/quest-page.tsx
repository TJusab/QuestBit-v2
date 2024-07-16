import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { getQuests } from "../../lib/database";
import Header from "../../components/Header";
import { useFocusEffect, router, useLocalSearchParams } from "expo-router";
import { Quest } from "@/constants/types";
import QuestCard from "../../components/QuestCard";

interface QuestItem {
  item: Quest;
}

const QuestPage = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  const { refresh } = useLocalSearchParams();

  const fetchQuests = async () => {
    try {
      const response: Quest[] = await getQuests();
      setQuests(response);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchQuests();
    }, [])
  );

  const handleQuestUpdate = async () => {
    setLoading(true);
    await fetchQuests();
  };

  if (loading) {
    return (
      <View
        className="flex-1 align-items-center"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="bg-blue-50 h-full">
      <FlatList
        data={quests}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <QuestCard item={item} onUpdate={handleQuestUpdate} />
        )}
        ListHeaderComponent={() => <Header header={"My Quests !"} />}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/pages/create_quest")}
      >
        <Image
          source={require("../../assets/HD/add_circle_button.png")}
          style={{ width: 48, height: 48 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default QuestPage;
