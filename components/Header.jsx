import { Text, View, Image } from "react-native";
import { getCurrentUser } from "../lib/account";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserIcon } from "../lib/icon";
import { globalStyles } from "../app/global_css";

const Header = ({ header }) => {

  const { user } = useGlobalContext();
  return (
    <View className="flex-row w-[95%] justify-between mt-5 items-center mb-5">
      <Text
        className="font-press text-2xl text-center ml-5"
        style={globalStyles.title}
      >
        { header }
      </Text>
      <Image
        source={getUserIcon(user.icon)}
        className="w-[60] h-[60] mb-5 ml-5"
      />
    </View>
  );
};

export default Header;
