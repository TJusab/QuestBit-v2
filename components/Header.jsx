import { Text, View, Image } from "react-native";
import { getCurrentUser } from "../lib/account";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserIcon } from "../lib/icon";

const Header = () => {
  const { user } = useGlobalContext();
  return (
    <View className="flex-row justify-end mt-5">
      <Image
        source={getUserIcon(user.icon)}
        className="w-[70] h-[70] mx-5 mb-5"
      />
    </View>
  );
};

export default Header;
