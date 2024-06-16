import { Text, View, Image } from "react-native";

const Header = () => {
  return (
    <View className="flex-row justify-end">
      <Image
        source={require("../assets/pixelArt/avatar 1.png")}
        className="w-[70] h-[70] mx-5 mb-5"
      />
    </View>
  );
};

export default Header;
