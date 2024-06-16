import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import PixelButton from "./PixelButton";
import Icon from "react-native-vector-icons/FontAwesome"; // Adjust the icon based on the package you're using

const QuestBit = ({ item }) => {
  const dateString = item.dueDates[0];
  const date = new Date(dateString);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return (
    <TouchableOpacity className="bg-white rounded-xl flex-row items-center justify-between px-2 shadow-xl my-2 mx-5">
      <View className="flex-col">
        <Text className="font-zcool text-2xl text-justify">{item.title}</Text>
        <Text className="font-zcool text-md text-gray">{item.description}</Text>
        <View className="flex-row justify-between w-[80%] items-center">
          <PixelButton
            text={`${item.status}`}
            imageStyle="w-[18vw]"
            textStyle="text-sm"
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
  );
};

export default QuestBit;
