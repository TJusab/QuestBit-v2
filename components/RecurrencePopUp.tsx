import React, { useState } from "react";
import { View, Text, Modal, ImageBackground } from "react-native";
import PixelButton from "./PixelButton";
import Dropdown from "./Dropdown";
import { updateQuestBitStatus } from "../lib/database";
import { Difficulty, RecurrenceValue, Status } from "../constants/enums";

interface RecurrenceopUpProps {
  visible: boolean;
  onClose: () => void;
  initial: string;
  onUpdate?: (value: string) => void;
}

const RecurrencePopUp: React.FC<RecurrenceopUpProps> = ({
  visible,
  onClose,
  initial,
  onUpdate,
}) => {
  const [newValue, setNewValue] = useState(initial);

  const handleUpdate = async () => {
    try {
      if (onUpdate) onUpdate(newValue);
      onClose();
    } catch (error) {
      console.error("Error updating questbit status:", error);
    }
  };

  const items = [
    { label: RecurrenceValue.NoRepeat, value: RecurrenceValue.NoRepeat },
    { label: RecurrenceValue.Daily, value: RecurrenceValue.Daily },
    { label: RecurrenceValue.BiWeekly, value: RecurrenceValue.BiWeekly},
    { label: RecurrenceValue.Weekly, value: RecurrenceValue.Weekly},
    { label: RecurrenceValue.Monthly, value: RecurrenceValue.Monthly},
    { label: RecurrenceValue.Annually, value: RecurrenceValue.Annually},    
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center">
        <View className="w-4/5 h-4/5 items-center justify-center">
          <ImageBackground
            source={require("../assets/HD/paper.png")}
            className="w-full h-full items-center justify-center"
            resizeMode="contain"
          >
            <View>
              <Text className="font-zcool text-xl text-brown-200 text-center px-10 pt-5">
                Select the new recurrence of the QuestBit
              </Text>
              <View className="w-3/5 m-auto my-8 z-10">
                <Dropdown
                  initialValue={newValue}
                  onChangeValue={(value) => setNewValue(value)}
                  items={items}
                />
              </View>
              <View className="flex-row items-center justify-center ml-10">
                <PixelButton
                  text="Cancel"
                  textStyle="text-sm"
                  color="red"
                  onPress={onClose}
                />
                <PixelButton
                  text="Update"
                  textStyle="text-sm"
                  onPress={handleUpdate}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default RecurrencePopUp;
