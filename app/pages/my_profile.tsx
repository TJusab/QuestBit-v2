import { ScrollView, Text, View, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserBodyIcon } from "@/utils/icon";
import { getUserIcon } from "@/utils/icon";
import StatsBox from "@/components/StatsBox";

const MyProfile = () => {
  const { user } = useGlobalContext();

  return (
    <ScrollView className="w-full h-full">
      <View className="flex-col">
        <View className="flex-row">
          <View>
            <Image
              source={getUserIcon(user.icon)}
              style={{ width: 150, height: 150 }}
            />
          </View>
          <View className="flex-col">
            <Text>{user.username}</Text>
            <Text>{user.icon} Class</Text>
            <Text>Level {user.level}</Text>
            <Text>{user.experiencePoints} / 1500 XP</Text>
            <Text>Progress Component</Text>
            <Text>4 Friends</Text>
          </View>
        </View>
        <View>
          <Text>About Me!</Text>
          <Text>
            {user.bio}
          </Text>
        </View>
        <View className="flex-wrap flex-row">
          <StatsBox title="21 QuestBits Assigned" />
          <StatsBox title="10 QuestBits Completed" />
          <StatsBox title="Recruited in 5 Quests" />
          <StatsBox title="Completed 2 Quests" />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyProfile;
