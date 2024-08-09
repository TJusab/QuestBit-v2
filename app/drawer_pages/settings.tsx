import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import SearchInput from "@/components/SearchInput";
import FontAwesome from "react-native-vector-icons/FontAwesome6";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteAccount, logout } from "@/lib/account";
import { router } from "expo-router";

const Settings = () => {
  const [search, setSearch] = useState("");

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

  const submitDeleteAccount = async () => {
    setIsSubmitting(true);
    try {
      await deleteAccount();
      router.replace("/log-in");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView>
      <View className="flex-1 bg-lightgray">
        <View className="bg-white rounded-2xl py-10 items-center">
          <View className="w-[90%]">
            <SearchInput
              placeholder="Search"
              value={search}
              handleChangeText={setSearch}
            />
          </View>
        </View>
        <View className="bg-white rounded-xl mt-3 px-5">
          <Text className="font-zcool text-gray-200 text-2xl my-5">
            Account settings
          </Text>
          <View className="flex-row items-center mb-3 w-full">
            <FontAwesome name="user-pen" size={16} color="black" />
            <Text className="font-zcool text-black text-lg ml-2 flex-1">
              Edit profile
            </Text>
            <MaterialIcon name="navigate-next" size={24} color="black" />
          </View>
          <View className="flex-row items-center mb-5">
            <FontAwesome name="share-nodes" size={16} color="black" />
            <Text className="font-zcool text-black text-lg ml-2">
              Share profile
            </Text>
          </View>
        </View>
        <View className="bg-white rounded-xl mt-3 px-5">
          <Text className="font-zcool text-gray-200 text-2xl my-5">
            Accesssibility
          </Text>
          <View className="flex-row items-center mb-3 w-full">
            <FontAwesome name="palette" size={16} color="black" />
            <Text className="font-zcool text-black text-lg ml-2 flex-1">
              Themes
            </Text>
            <MaterialIcon name="navigate-next" size={24} color="black" />
          </View>
          <View className="flex-row items-center mb-5">
            <MaterialCommunityIcon name="bell" size={22} />
            <Text className="font-zcool text-black text-lg ml-2">
              Notifications
            </Text>
          </View>
        </View>
        <View className="bg-white rounded-xl mt-3 px-5">
          <Text className="font-zcool text-gray-200 text-2xl my-5">Login</Text>
          <TouchableOpacity onPress={submitLogout}>
            <View className="flex-row items-center mb-3">
              <MaterialIcon name="logout" size={16} />
              <Text className="font-zcool text-black text-lg ml-2">
                Log out
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={submitDeleteAccount}>
            <View className="flex-row items-center mb-5">
              <FontAwesome name="x" size={16} color="#C1161C" />
              <Text className="font-zcool text-red text-lg ml-2">
                Delete account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="bg-white rounded-xl py-5 items-center mt-3 mb-5 px-5 w-full flex-row justify-between">
          <Text className="font-zcool text-black text-3xl">About QuestBit</Text>
          <MaterialIcon name="navigate-next" size={24} color="black" />
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
