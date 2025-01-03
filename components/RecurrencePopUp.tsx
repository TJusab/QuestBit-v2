import React, { useState } from "react";
import { View, Text, Modal, ImageBackground } from "react-native";
import PixelButton from "./PixelButton";
import Dropdown from "./Dropdown";
import { Recurrence } from "../constants/enums";

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
      console.error("Error updating questbit recurrence:", error);
    }
  };

  const items = [
    { label: Recurrence.NoRepeat, value: Recurrence.NoRepeat },
    { label: Recurrence.Daily, value: Recurrence.Daily },
    { label: Recurrence.BiWeekly, value: Recurrence.BiWeekly},
    { label: Recurrence.Weekly, value: Recurrence.Weekly},
    { label: Recurrence.Monthly, value: Recurrence.Monthly},
    { label: Recurrence.Annually, value: Recurrence.Annually},    
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
            source={require("../assets/HD/scrolls/paper.png")}
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
