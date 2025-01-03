import React from 'react';
import { View, Text, Modal, ImageBackground } from 'react-native';
import PixelButton from './PixelButton';

interface DeletePopUpProps {
  visible: boolean;
  onClose: () => void;
  handleDelete: () => void;
  text: string;
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({ visible, onClose, handleDelete, text }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center">
        <View className="w-4/5 h-4/5">
          <ImageBackground
            source={require("../assets/HD/scrolls/paper.png")}
            className="w-full h-full items-center justify-center"
            resizeMode="contain"
          >
            <View className="mt-10">
              <Text className="font-zcool text-xl text-brown-200 text-center px-10">
                {text}
              </Text>
              <View className="flex-row items-center justify-center ml-10 mt-10">
                <PixelButton
                  text="Cancel"
                  textStyle="text-sm"
                  color="red"
                  onPress={onClose}
                />
                <View className="mr-4" />
                <PixelButton
                  text="Delete"
                  textStyle="text-sm"
                  onPress={handleDelete}
                />
                <View className="mr-6" />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default DeletePopUp;