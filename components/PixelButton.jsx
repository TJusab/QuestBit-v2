import { TouchableOpacity, Text, Image } from "react-native";

const PixelButton = ({ text }) => {
  return (
    <TouchableOpacity className="items-center justify-center">
      <Image
        source={require("../assets/images/small-pixel-btn.png")}
        resizeMode="contain"
        className="w-[30vw]"
      />
      <Text
        className="text-white font-zcool absolute text-2xl"
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PixelButton;
