import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import StatusPopUp from "./StatusPopUp";
import { getButtonImage } from "../utils/utils";
import { Status } from "../constants/enums";

interface StatusButtonProps {
  text: string;
  questbitId?: string;
  isLoading?: boolean;
  imageStyle?: string;
  textStyle?: string;
  color?: "red" | "blue" | "pink" | "yellow" | "green";
  onUpdate: (value: string) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  text,
  questbitId,
  isLoading = false,
  imageStyle = {},
  textStyle = {},
  color = "green",
  onUpdate,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={getButtonImage(color)}
          className={`w-[25vw] h-10 ${imageStyle}`}
        />
        <Text
          className={`text-white font-zcool absolute text-xl pb-1 ${textStyle}`}
        >
          {text}
        </Text>
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            className="absolute"
          />
        )}
      </TouchableOpacity>
      <StatusPopUp
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        value={text}
        questbitId={questbitId}
        onUpdate={(newStatus: string) => onUpdate(newStatus)}
      />
    </View>
  );
};

export default StatusButton;
