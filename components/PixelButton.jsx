import { View, ActivityIndicator, TouchableOpacity, Text, Image } from "react-native";

const PixelButton = ({ text, onPress = null, isLoading = false, imageStyle = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity className="items-center justify-center mr-5" onPress={onPress}>
      <Image
        source={require("../assets/HD/button_green.png")}
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
  );
};

export default PixelButton;
