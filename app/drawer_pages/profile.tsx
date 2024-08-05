import { View, Image, Text } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserIcon } from "@/utils/icon";
import GrayButton from "@/components/GrayButton";
import StatsBox from "@/components/StatsBox";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * TODO: Get REAL statistics by calculating questbits completed + quests completed
 * Make Share Profile --> somehow link to a social media page?
 * Make edit profile route to drawer page
 */


const Profile =  () => {
  const { user } = useGlobalContext();

  if (!user) {
    return null;
  }

  return (
    <View className="flex-1 bg-blue-50">
      <View className="flex-row items-center justify-between mt-10">
        <Image
          source={getUserIcon(user.icon)}
          style={{ width: 150, height: 150 }}
          className="ml-10"
        />
        <View className="flex-col mr-20">
          <Text className="font-press text-3xl text-navy">{user.username}</Text>
          <Text className="font-zcool text-xl text-navy">
            {user.icon} Class
          </Text>
          <Text className="font-zcool text-xl text-navy">
            Level {user.level}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between mx-10 mt-5">
        <TouchableOpacity onPress={() => console.log("edit profile clicked!")}>
          <GrayButton text="Edit Profile" />
        </TouchableOpacity>
        <GrayButton text="Share Profile" />
      </View>
      <View className="border-b-2 border-lightgray my-10"></View>
      <View className="flex-row justify-center">
        <View className="mr-10">
          <StatsBox stat={21} text="Completed QuestBits" />
        </View>
        <View>
          <StatsBox stat={3} text="Completed Quests" />
        </View>
      </View>
    </View>
  );
};

export default Profile;
