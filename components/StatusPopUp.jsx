import React, { useState } from 'react';
import { View, Text, Modal, ImageBackground } from 'react-native';
import PixelButton from './PixelButton';
import Dropdown from './Dropdown';
import { updateQuestBitStatus } from '../lib/database';

const StatusPopUp = ({ visible, onClose, value, questbitId, onUpdate }) => {

  const [newStatus, setNewStatus] = useState(value);

  const handleUpdate = async () => {
    try {
      await updateQuestBitStatus(questbitId, newStatus);
      onUpdate(); // Refresh the questbit list
      onClose(); // Close the modal after update
    } catch (error) {
      console.error('Error updating questbit status:', error);
    }
  };

  const [items, setItems] = useState([
    { label: 'Unassigned', value: 'Unassigned' },
    { label: 'Assigned', value: 'Assigned' },
    { label: 'On Going', value: 'OnGoing' },
    { label: 'Completed', value: 'Completed' },
  ]);

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
                <Dropdown initialValue={newStatus} onChangeValue={setNewStatus} items={items} />
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
