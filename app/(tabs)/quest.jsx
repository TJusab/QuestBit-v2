import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getQuests } from "../../lib/database";
import { getQuestIcon } from "../../lib/icon";
import { globalStyles } from "../global_css";
import Header from "../../components/Header";
import { router } from "expo-router";

const Quest = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    const fetchQuestsAndIcons = async () => {
      try {
        // Fetch quests
        const response = await getQuests();
        setQuests(response); // Set the quests state with the response

        // Fetch icons
        const iconsToFetch = {};
        for (const quest of response) {
          const questIcon = getQuestIcon(quest.icon);
          iconsToFetch[quest.$id] = questIcon;
        }
        setIcons(iconsToFetch);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestsAndIcons();
  }, []);

  const renderQuestItem = ({ item }) => (
    <TouchableOpacity
      className="mb-5 p-5 bg-blue-200 rounded-xl mx-5"
      onPress={() => handleQuestPress(item)}
    >
      <View className="flex-row justify-between items-center">
        {icons[item.$id] && (
          <Image source={icons[item.$id]} style={{ width: 48, height: 48 }} />
        )}
        <TouchableOpacity
          onPress={() => handleMoreOptionsPress(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="ellipsis-v" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="py-4 flex-1">
        <Text className="font-press text-xl" style={globalStyles.questTitle}>
          {item.title}
        </Text>
        <Text className="font-zcool text-lg text-white">{item.questInfo}</Text>
      </View>
      <View style={globalStyles.progress_bar}>
        <View style={[globalStyles.progress, { width: `${item.progress}%` }]} />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="font-zcool text-lg text-white">Progress</Text>
        <Text className="font-zcool text-lg text-white">{item.progress}%</Text>
      </View>
    </TouchableOpacity>
  );

  const handleQuestPress = (quest) => {
    console.log("Quest Pressed:", quest);
  };

  const handleMoreOptionsPress = (quest) => {
    console.log("More Options Pressed:", quest);
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
        renderItem={renderQuestItem}
        ListHeaderComponent={() => <Header header={"My Quests !"} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/pages/create-quest")}>
        <Image source={require("../../assets/HD/add_circle_button.png")} style={{ width: 48, height: 48 }} />
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
    zIndex: 1000
  }
});

export default Quest;
