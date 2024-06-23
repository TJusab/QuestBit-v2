import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import PixelButton from "./PixelButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalStyles } from '../app/global_css';
import CustomModal from './StatusPopUp'; // Adjust the import path as needed

const QuestBit = ({ item, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dateString = item.dueDates[0];
  const date = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <View>
      <TouchableOpacity
      style={globalStyles.border}
      className="bg-white rounded-xl flex-row items-center justify-between p-2 shadow-xl my-2 mx-5"
    >
        <View className="flex-col">
        <View className="flex-row items-center">
          <Image
            source={getQuestIcon(item.quests.icon)}
            style={{ width: 25, height: 25 }}
            className="mr-5"
          />
            <Text className="font-zcool text-2xl text-justify">{item.title}</Text>
          </View>
          <View className="flex-row justify-between w-[80%] items-center">
            <PixelButton
              text={`${item.status}`}
              textStyle="text-sm"
            status={`${item.status}`}
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
