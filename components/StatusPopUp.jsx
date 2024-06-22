// CustomModal.jsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import PixelButton from './PixelButton';
import DropdownMenu from './StatusDropdown'

const CustomModal = ({ visible, onClose, value }) => {
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
              <Text className="font-zcool text-xl text-brown-200 text-center px-10 pt-5">Select the new state of the QuestBit</Text>
              <View className="w-3/5 m-auto my-8 z-10">
                <DropdownMenu initialValue={value} />
              </View>
              <View className="flex-row items-center justify-center ml-10">
                <PixelButton
                  text="Cancel"
                  textStyle="text-sm"
                  color="red"
                  onPress={onClose}
                />
                <PixelButton
                  text="Change"
                  textStyle="text-sm"
                  onPress={onClose}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
