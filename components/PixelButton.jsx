import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, Image } from "react-native";

const PixelButton = ({ text, onPress = null, isLoading = false, imageStyle = {}, textStyle = {}, color}) => {
  const getButtonImage = (color) => {
    switch (color) {
      case "red":
        return require("../assets/HD/button_red.png");
      case "blue":
        return require("../assets/HD/button_blue.png");
      case "pink":
        return require("../assets/HD/button_pink.png");
      case "yellow":
        return require("../assets/HD/button_yellow.png");
      case "green":
      default:
        return require("../assets/HD/button_green.png");
    }
  };

  return (
    <View>
      <TouchableOpacity className="items-center justify-center" onPress={onPress}>
        <Image
          source={getButtonImage(color)}
          className={`w-[25vw] h-10 ${imageStyle}`}
        />
        <Text className={`text-white font-zcool absolute text-xl pb-1 ${textStyle}`}>{text}</Text>
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
