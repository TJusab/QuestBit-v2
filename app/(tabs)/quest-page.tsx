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
import { useGlobalContext } from "@/context/GlobalProvider";

interface QuestItem {
  item: Quest;
}

const QuestPage = () => {
  const { quests, setQuests } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuests();
    };
    fetchData();
  }, []);

  const fetchQuests = async () => {
    try {
      setLoading(true)
      const response: Quest[] = await getQuests();
      setQuests(response);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
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

  const handleUpdate = (deletedQuestId: string) => {
    setQuests(prevQuests => prevQuests.filter(quest => quest.$id !== deletedQuestId));
  }

  return (
    <View>
      <FlatList
        data={quests}
        keyExtractor={(item) => item.$id}
        extraData={quests}
        renderItem={({ item }) => (
          <QuestCard item={item} onUpdate={handleUpdate} />
        )}
        ListHeaderComponent={() => (
          <Header header={"My Quests !"} colorStyle={"green"} />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/pages/create_quest")}
      >
        <Image
          source={require("../../assets/HD/add_button.png")}
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
