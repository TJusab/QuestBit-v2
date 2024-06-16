import { View, ActivityIndicator, TouchableOpacity, Text, Image } from "react-native";

const PixelButton = ({ text, onPress, isLoading }) => {
  return (
    <TouchableOpacity className="items-center justify-center" onPress={onPress}>
      <Image
        source={require("../assets/HD/button_empty.png")}
        className="w-[25vw] h-10"
      />
      <Text className="text-white font-zcool absolute text-xl pb-1">{text}</Text>

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
