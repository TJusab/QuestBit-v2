import { Text, View, Image } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserIcon } from "../utils/icon";
import React from "react";
import { globalStyles } from '../app/global_styles';

interface HeaderProps {
  header: string;
  colorStyle?: string;
}

const Header: React.FC<HeaderProps> = ({ header, colorStyle }) => {
  const { user } = useGlobalContext();
  return (
    <View className="flex-row w-[95%] justify-between mt-12 items-center mb-5">
      <Text className="font-press text-2xl text-center ml-5" style={ colorStyle=="green" ? globalStyles.greenTitle : globalStyles.title }>
        {header}
      </Text>
    </View>
  );
};

export default Header;