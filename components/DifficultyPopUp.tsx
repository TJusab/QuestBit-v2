import React, { useState } from "react";
import { View, Text, Modal, ImageBackground } from "react-native";
import PixelButton from "./PixelButton";
import Dropdown from "./Dropdown";
import { updateQuestBitStatus } from "../lib/database";
import { Difficulty, RecurrenceValue, Status } from "../constants/enums";

interface DifficultyPopUpProps {
  visible: boolean;
  onClose: () => void;
  value: string;
  questbitId?: string;
  onUpdate?: () => void;
}

const DifficultyPopUp: React.FC<DifficultyPopUpProps> = ({
  visible,
  onClose,
  value,
  questbitId,
  onUpdate,
}) => {
  const [newStatus, setNewStatus] = useState(value);

  const handleUpdate = async () => {
    try {
      if (questbitId) await updateQuestBitStatus(questbitId, newStatus);
      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating questbit status:", error);
    }
  };

  const items = [
    { label: Difficulty.EasyPeasy + " |  50 XP", value: Difficulty.EasyPeasy },
    { label: Difficulty.Easy + " |  100 XP", value: Difficulty.Easy },
    { label: Difficulty.Medium + " |  200 XP", value: Difficulty.Medium },
    { label: Difficulty.Hard + " |  300 XP", value: Difficulty.Hard },
    { label: Difficulty.ExtremelyHard + " |  350 XP", value: Difficulty.ExtremelyHard },
    { label: Difficulty.DieHard + " |  400 XP", value: Difficulty.DieHard },
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
                Select the new difficulty of the QuestBit
              </Text>
              <View className="w-3/5 m-auto my-8 z-10">
                <Dropdown
                  initialValue={newStatus}
                  onChangeValue={(value) => setNewStatus(value)}
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

export default DifficultyPopUp;
