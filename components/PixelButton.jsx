import { ActivityIndicator, TouchableOpacity, Text, Image } from "react-native";

const PixelButton = ({ text, onPress, isLoading }) => {
  return (
    <TouchableOpacity className="items-center justify-center" onPress={onPress}>
      <Image
        source={require("../assets/images/small-pixel-btn.png")}
        resizeMode="contain"
        className="w-[25vw]"
      />
      <Text className="text-white font-zcool absolute text-xl">{text}</Text>

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
