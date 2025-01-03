import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Quest } from "@/constants/types";
import DeletePopUp from "./DeletePopUp";
import { getQuestIcon } from "@/utils/icon";
import { globalStyles } from "@/app/global_styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { router } from "expo-router";
import { deleteQuest } from "@/lib/database";

interface QuestCardProps {
  item: Quest;
  onUpdate: (deletedQuestId: string) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ item, onUpdate }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const handeQuestDetailsPress = () => {
    router.push({
      pathname: "/pages/questdetails",
      params: { quest: JSON.stringify(item) },
    });
  };

  const handleQuestPress = () => {
    router.push({
      pathname: "/pages/quests",
      params: { quest: JSON.stringify(item) }, 
    });
  };  

  const handleDelete = async () => {
    try {
      await deleteQuest(item.$id);
      onUpdate(item.$id);
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting questbit:", error);
    }
  };

  return (
    <View className="mb-5 px-5">
      <TouchableOpacity className="bg-blue-200 shadow-xl shadow-black rounded-xl p-5" onPress={handleQuestPress}>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image source={getQuestIcon(item.icon)} style={{ width: 48, height: 48 }} />
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={handeQuestDetailsPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className="mr-4"
            >
              <Icon name="pen" size={22} color="#408C28" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(true)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="trash" size={22} color="#408C28"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <Text className="font-press text-xl" style={globalStyles.questTitle}>{item.title}</Text>
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
      <DeletePopUp
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        handleDelete={handleDelete}
        text="Are you sure you want to delete this Quest?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  /* Do not delete the following style class, when it is translated to tailwind css, 
  the layout goes all wrong once a quest in the FlatList is deleted */
  content: {
    paddingVertical: 16,
    flex: 1,
  },
});

export default QuestCard;
