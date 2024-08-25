import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
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
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import { logout } from "@/lib/account";
import { User } from "@/constants/types";

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
  const loggedInUser = user as User;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogout = async () => {
    setIsSubmitting(true);
    try {
      await logout();
      router.replace("/log-in");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1">
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "#61C6ED" }}
      >
        <ImageBackground
          source={require("../assets/HD/backgrounds/sky_clouds.png")}
          className="p-5"
          resizeMode="cover"
        >
          <Image
            source={getUserIcon(loggedInUser.icon)}
            style={{ width: 100, height: 100 }}
            className="mb-5"
          />
          <Text className="font-press text-xl" style={globalStyles.title}>
            {loggedInUser.username}
          </Text>
          <Text className="font-zcool text-xl text-navy">
            {loggedInUser.icon} Class
          </Text>
          <Text className="font-zcool text-xl text-navy">
            Level {loggedInUser.level}
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
        <TouchableOpacity onPress={submitLogout}>
          <View className="flex-row items-center mb-7">
            <MaterialIcon name="logout" size={22} />
            <Text
              className="font-zcool text-navy ml-3"
              style={{ fontSize: 18 }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View className="flex-row items-center">
            <MaterialIcon name="star" size={22} />
            <Text
              className="font-zcool text-navy ml-3"
              style={{ fontSize: 18 }}
            >
              Rate App
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
