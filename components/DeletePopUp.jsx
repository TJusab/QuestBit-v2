import { View, Text, Modal, ImageBackground } from 'react-native';
import PixelButton from './PixelButton';
import { deleteQuestBit } from '../lib/database';

const DeletePopUp = ({ visible, onClose, questbitId, onUpdate }) => {

  const handleDelete = async () => {
    try {
      await deleteQuestBit(questbitId);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error deleting questbit:', error);
    }
  };

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
            source={require("../assets/HD/paper.png")}
            className="w-full h-full items-center justify-center"
            resizeMode="contain"
          >
            <View className="mt-10">
              <Text className="font-zcool text-xl text-brown-200 text-center px-10">
                Are you sure you want to delete this QuestBit?
              </Text>
              <View className="flex-row items-center justify-center ml-10 mt-10">
                <PixelButton
                  text="Cancel"
                  textStyle="text-sm"
                  color="red"
                  onPress={onClose}
                />
                <PixelButton
                  text="Delete"
                  textStyle="text-sm"
                  onPress={handleDelete}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default DeletePopUp;
