import { Text, View, Image } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserIcon } from "../lib/icon";
import React from "react";
import { globalStyles } from '../app/global_styles';

interface HeaderProps {
  header: string;
}

const Header: React.FC<HeaderProps> = ({ header }) => {
  const { user } = useGlobalContext();
  return (
    <View className="flex-row w-[95%] justify-between mt-12 items-center mb-5">
      <Text className="font-press text-2xl text-center ml-5" style={globalStyles.title}>
        {header}
      </Text>
      <Image
        source={getUserIcon(user.icon)}
        className="w-[70] h-[70] mb-5 ml-5"
      />
    </View>
  );
};

export default Header;