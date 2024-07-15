import React, { useState } from "react";
import { View, Text, Modal, ImageBackground } from "react-native";
import PixelButton from "./PixelButton";
import Dropdown from "./Dropdown";
import { updateQuestBitStatus } from "../lib/database";
import { Status } from "../constants/enums";

interface StatusPopUpProps {
  visible: boolean;
  onClose: () => void;
  value: Status;
  questbitId?: string;
  onUpdate?: () => void;
}

const StatusPopUp: React.FC<StatusPopUpProps> = ({
  visible,
  onClose,
  value,
  questbitId,
  onUpdate,
}) => {
  const [newStatus, setNewStatus] = useState<Status>(value);

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
    { label: Status.Unassigned, value: Status.Unassigned },
    { label: Status.Assigned, value: Status.Assigned },
    { label: Status.OnGoing, value: Status.OnGoing },
    { label: Status.Completed, value: Status.Completed },
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
                Select the new state of the QuestBit
              </Text>
              <View className="w-3/5 m-auto my-8 z-10">
                <Dropdown
                  initialValue={newStatus}
                  onChangeValue={(value: Status) => setNewStatus(value as Status)}
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

export default StatusPopUp;