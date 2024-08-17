import { View, Text } from "react-native";
import React from "react";

interface GrayButtonProps {
  text: string;
}

const GrayButton: React.FC<GrayButtonProps> = ({ text }) => {
  return (
    <View className="bg-lightgray rounded-xl justify-center px-10 py-2">
      <Text className="font-zcool text-base text-center">
        {text}
      </Text>
    </View>
  );
};

export default GrayButton;
