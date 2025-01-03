import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import PixelButton from "./PixelButton";
import { getIcons, getQuestIcon } from "../utils/icon";
import { QuestIcon } from "../constants/enums";

interface IconPickerPopUpProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (icon: QuestIcon) => void;
}

const IconPickerPopUp: React.FC<IconPickerPopUpProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [icons, setIcons] = useState<QuestIcon[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<QuestIcon>();

  const fetchIcons = async () => {
    try {
      const response = getIcons();
      setIcons(response);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const addIcon = () => {
    if (selectedIcon !== undefined) {
      onUpdate(selectedIcon);
      onClose();
    } else {
      Alert.alert("Error", "Please select an icon.");
    }
  };

  const handleIconPress = (icon: QuestIcon) => {
    setSelectedIcon(icon);
  };

  const isSelected = (icon: QuestIcon) => {
    return selectedIcon === icon;
  };

  useEffect(() => {
    fetchIcons();
  }, []);

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
                Select an icon for this Quest
              </Text>
              <View className="flex-row items-center justify-center">
                {icons.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    className={`mx-5 my-5 ${
                      isSelected(icon)
                        ? "border-navy border-2"
                        : "border-2 border-transparent"
                    }`}
                    onPress={() => handleIconPress(icon)}
                  >
                    <Image
                      source={getQuestIcon(icon)}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex-row items-center justify-center ml-10">
                <PixelButton
                  text="Cancel"
                  textStyle="text-sm"
                  color="red"
                  onPress={onClose}
                />
                <PixelButton text="Add" textStyle="text-sm" onPress={addIcon} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default IconPickerPopUp;
