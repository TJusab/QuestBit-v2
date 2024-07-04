import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import StatusButton from "./StatusButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import StatusModal from "./StatusPopUp";
import DeleteModal from "./DeletePopUp";
import { router } from "expo-router";
import { getQuestIcon, getUserIcon } from "../lib/icon";

const QuestBit = ({ item, onUpdate }) => {
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const dateString = item.dueDates[0];
  const date = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const getColorFromStatus = (status) => {
    switch (status) {
      case "Unassigned":
        return "yellow";
      case "OnGoing":
        return "blue";
      case "Assigned":
        return "pink";
      case "Completed":
        return "green";
    }
  };

  const getTextFromStatus = (status) => {
    switch (status) {
      case "OnGoing":
        return "On Going";
      default:
        return status;
    }
  };

  return (
    <View>
      <TouchableOpacity
        className="bg-white rounded-xl flex-row items-center p-2 my-2 mx-5"
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
            <TouchableOpacity onPress={() => setDeleteModalVisible(true)} className="px-3 py-1">
              <Icon name="ellipsis-v" size={24} color="#408C28" />
            </TouchableOpacity>
          </View>
          <Text className="font-zcool text-md text-justify text-gray mb-2">
            {item.description}
          </Text>
          <View className="flex-row items-center">
            <View className="flex-row items-center">
              <StatusButton
                color={getColorFromStatus(item.status)}
                text={getTextFromStatus(item.status)}
                textStyle="text-sm"
                onPress={() => setStatusModalVisible(true)}
                questbitId={item.$id}
                onUpdate={onUpdate}
              />
              <View className="flex-row mx-3">
                {item.assignees.length > 0 &&
                  item.assignees.map((assignee) => (
                    <View className="items-center mx-1" key={assignee.$id}>
                      <Image
                        source={getUserIcon(assignee.icon)}
                        style={{ width: 30, height: 30 }}
                        resizeMode="stretch"
                      />
                    </View>
                  ))}
              </View>
            </View>
            <View className="flex-1" />
            <View className="flex-row items-center">
              <Icon name="clock" size={20} color="#6E7591" />
              <Text className="font-zcool text-gray text-md px-2">
                {formattedDate}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        questbitId={item.$id}
        onUpdate={onUpdate}
      />
    </View>
  );
};

export default QuestBit;
