import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "@/app/global_styles";

interface StatsBoxProps {
  title: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ title }) => {
  return (
    <View className="bg-blue-200 rounded-xl w-[50%] justify-center">
      <Text className="font-press text-base text-justify m-2" style={globalStyles.questTitle}>
        {title}
      </Text>
    </View>
  );
};

export default StatsBox;
