import React from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { getButtonImage } from "@/utils/utils";

interface PixelButtonProps {
  text: string;
  onPress: () => void;
  isLoading?: boolean;
  imageStyle?: string;
  textStyle?: string;
  color?: "red" | "blue" | "pink" | "yellow" | "green";
}

const PixelButton: React.FC<PixelButtonProps> = ({
  text,
  onPress,
  isLoading = false,
  imageStyle = {},
  textStyle = {},
  color = "green",
}) => {

  return (
    <View>
      <TouchableOpacity
        className="items-center justify-center mr-5"
        onPress={onPress}
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
    </View>
  );
};

export default PixelButton;