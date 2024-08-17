import { View, Text } from "react-native";
import React from "react";

interface StatsBoxProps {
  stat: number;
  text: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ stat, text }) => {
  return (
    <View className="bg-lightgray rounded-xl justify-center p-5 w-[150]">
      <Text className="font-press text-2xl text-navy">{stat}</Text>
      <Text className="font-zcool text-xl text-justify">{text}</Text>
    </View>
  );
};

export default StatsBox;
