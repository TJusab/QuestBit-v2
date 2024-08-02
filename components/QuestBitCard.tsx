import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import StatusButton from "./StatusButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import DeletePopUp from "./DeletePopUp";
import { router } from "expo-router";
import { getQuestIcon, getUserIcon } from "../utils/icon";
import { deleteQuestBit } from "../lib/database";
import { QuestBit } from "../constants/types";
import { Status } from "../constants/enums";
import {
  getColorFromStatus,
  getEnumFromStatus,
  getStringFromStatus,
} from "../utils/utils";
interface QuestBitProps {
  item: QuestBit;
  onUpdate?: (questbitId: string, newStatus: string) => void;
}

const QuestBitCard: React.FC<QuestBitProps> = ({ item, onUpdate }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const dateString = item.dueDates?.[0];
  const date = dateString ? new Date(dateString) : null;
  const status = getEnumFromStatus(item.status);
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    : "";

  const handleDelete = async () => {
    try {
      await deleteQuestBit(item.$id);
      if (onUpdate) onUpdate(item.$id, status);
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting questbit:", error);
    }
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (onUpdate) onUpdate(item.$id, newStatus); 
  };

  return (
    <View>
      <TouchableOpacity
        className="bg-white shadow-xl shadow-black rounded-xl flex-row items-center p-2 my-2 mx-5"
        onPress={() =>
          router.push({
            pathname: "/pages/questbitdetails",
            params: { questbit: JSON.stringify(item) },
          })
        }
      >
        <View className="flex-col flex-1">
          <View className="flex-row items-center mb-5 pt-1 justify-between">
            <View className="flex-row items-center">
              <Image
                source={getQuestIcon(item.quests.icon)}
                style={{ width: 30, height: 30 }}
                className="mr-2"
              />
              <Text className="font-zcool text-2xl text-justify">
                {item.title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(true)}
              className="px-3 py-1"
            >
              <Icon name="ellipsis-v" size={24} color="#408C28" />
            </TouchableOpacity>
          </View>
          <Text className="font-zcool text-md text-justify text-gray mb-2">
            {item.description}
          </Text>
          <View className="flex-row items-center">
            <View className="flex-row items-center">
              <StatusButton
                color={getColorFromStatus(status)}
                text={getStringFromStatus(status)}
                textStyle="text-sm"
                questbitId={item.$id}
                onUpdate={handleStatusUpdate}
              />
              <View className="flex-row mx-3">
                {item.assignees &&
                  item.assignees.length > 0 &&
                  item.assignees.map((assignee) => (
                    <View className="items-center mx-1" key={assignee.$id}>
                      <Image
                        source={getUserIcon(assignee.icon)}
                        style={{ width: 40, height: 40 }}
                        resizeMode="stretch"
                      />
                    </View>
                  ))}
              </View>
            </View>
            <View className="flex-1" />
            {date && (
              <View className="flex-row items-center">
                <Icon name="clock" size={20} color="#6E7591" />
                <Text className="font-zcool text-gray text-md px-2">
                  {formattedDate}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <DeletePopUp
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        handleDelete={handleDelete}
        text="Are you sure you want to delete this QuestBit?"
      />
    </View>
  );
};

export default QuestBitCard;
