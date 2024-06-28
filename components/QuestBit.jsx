import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import StatusButton from "./StatusButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalStyles } from "../app/global_css";
import CustomModal from "./StatusPopUp"; // Adjust the import path as needed
import { router } from "expo-router";
import { getQuestIcon, getUserIcon } from "../lib/icon";

const QuestBit = ({ item, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
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
        style={globalStyles.border}
        className="bg-white rounded-xl flex-row items-center justify-between p-2 shadow-xl my-2 mx-5"
        onPress={() =>
          router.push({
            pathname: "/pages/questbitdetails",
            params: { questbit: JSON.stringify(item) },
          })
        }
      >
        <View className="flex-col">
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
          <View className="flex-row mt-3 mr-3 mb-2">
              {item.assignees.length > 0 &&
                item.assignees.map((assignee) => (
                  <View className="items-center">
                    <Image
                      key={assignee.id}
                      source={getUserIcon(assignee.icon)}
                      style={{ width: 50, height: 50 }}
                      resizeMode="stretch"
                    />
                    <Text className="font-zcool text-justify text-gray">{assignee.username}</Text>
                  </View>
                ))}
          </View>
          <View className="flex-row justify-between w-[80%] items-center">
            <StatusButton
              color={getColorFromStatus(item.status)}
              text={getTextFromStatus(item.status)}
              textStyle="text-sm"
              onPress={() => setModalVisible(true)}
            />
            <View className="flex-row items-center">
              <Icon name="clock-o" size={20} color="#6E7591" />
              <Text className="font-zcool text-gray text-md px-2">
                {formattedDate}
              </Text>
            </View>
          </View>
        </View>
        <View className="px-3">
          <Icon name="ellipsis-v" size={20} color="#5C944A" />
        </View>
      </TouchableOpacity>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        value={`${item.status}`}
        questbitId={item.$id}
        onUpdate={onUpdate}
      />
    </View>
  );
};

export default QuestBit;
