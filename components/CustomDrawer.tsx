import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserIcon } from "@/utils/icon";
import { globalStyles } from "@/app/global_styles";

interface CustomDrawerProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  const { user } = useGlobalContext();

  return (
    <View className="flex-1">
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "#61C6ED" }}
      >
        <ImageBackground
          source={require("../assets/HD/blue_sky.png")}
          className="p-5"
          resizeMode="cover"
        >
          <Image
            source={getUserIcon(user.icon)}
            style={{ width: 100, height: 100 }}
            className="mb-5"
          />
          <Text className="font-press text-xl" style={globalStyles.title}>
            {user.username}
          </Text>
          <Text className="font-zcool text-xl text-white">
            {user.icon} Class
          </Text>
          <Text className="font-zcool text-xl text-white">
            Level {user.level}
          </Text>
        </ImageBackground>
        <View className="bg-white pt-2">
          <DrawerItemList
            state={state}
            navigation={navigation}
            descriptors={descriptors}
          />
        </View>
      </DrawerContentScrollView>
      <View className="p-5 border-t-2 border-lightgray">
        <TouchableOpacity onPress={() => {}}>
          <View className="flex-row items-center mb-7">
            <Text className="font-zcool text-navy" style={{ fontSize: 18 }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View className="flex-row items-center">
            <Text className="font-zcool text-navy" style={{ fontSize: 18 }}>
              Rate this App
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
