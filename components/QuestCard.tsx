import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Quest } from "@/constants/types";
import DeletePopUp from "./DeletePopUp";
import { getQuestIcon } from "@/utils/icon";
import { globalStyles } from "@/app/global_styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { router } from "expo-router";
import { deleteQuest } from "@/lib/database";

interface QuestCardProps {
  item: Quest;
  onUpdate: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ item, onUpdate }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const handleQuestPress = () => {
    router.push({
      pathname: "/pages/questdetails",
      params: { quest: JSON.stringify(item) },
    });
  };

  const handleDelete = async () => {
    try {
      await deleteQuest(item.$id);
      if (onUpdate) onUpdate();
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting questbit:", error);
    }
  };

  return (
    <TouchableOpacity
      className="mb-5 p-5 bg-blue-200 rounded-xl mx-5 shadow-xl shadow-black rounded-xl"
      onPress={() => handleQuestPress()}
    >
      <View className="flex-row justify-between items-center">
        <Image
          source={getQuestIcon(item.icon)}
          style={{ width: 48, height: 48 }}
        />
        <TouchableOpacity
          onPress={() => setDeleteModalVisible(true)}
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
      <DeletePopUp
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        handleDelete={handleDelete}
        text="Are you sure you want to delete this Quest?"
      />
    </TouchableOpacity>
  );
};

export default QuestCard;
