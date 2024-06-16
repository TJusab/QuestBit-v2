import { ActivityIndicator, TouchableOpacity, Text, Image } from "react-native";

const PixelButton = ({ text, onPress = null, isLoading = false, imageStyle = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity className="items-center justify-center mr-5" onPress={onPress}>
      <Image
        source={require("../assets/images/small-pixel-btn.png")}
        resizeMode="contain"
        className={`w-[25vw] ${imageStyle}`}
      />
      <Text className={`text-white font-zcool absolute text-xl ${textStyle}`}>{text}</Text>

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
