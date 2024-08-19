import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  ListRenderItem,
  FlatList,
} from "react-native";
import Header from "@/components/Header";
import { fetchFriends } from "../../lib/database";
import { getUserIcon, getUserBodyIcon } from "../../utils/icon";
import { User } from "@/constants/types";

const Leaderboard = () => {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const loadFriendshipRequests = async () => {
      try {
        const result = await fetchFriends();
        // Sort friends by user xp in descending order
        result.sort((a, b) => b.experiencePoints - a.experiencePoints);
        setFriends(result);
      } catch (error) {
        console.error("Error fetching friendship requests:", error);
      }
    };

    loadFriendshipRequests();
  }, []);

  const renderFriends: ListRenderItem<User> = ({ item, index }) => (
    <View
      className="bg-white shadow-xl shadow-black rounded-xl flex-row items-center p-2 px-5 mx-5 my-2"
      key={item.$id}
    >
      <Text className="font-press text-2xl mr-3 mt-3">{index + 4}</Text>
      <Image
        source={getUserIcon(item.icon)}
        style={{ width: 64, height: 64 }}
        resizeMode="stretch"
      />
      <View className="px-2">
        <Text className="font-zcool text-2xl">{item.username}</Text>
        <Text className="font-zcool text-lg text-gray-100">
          {item.experiencePoints} XP
        </Text>
      </View>
    </View>
  );

  const topThree = friends.slice(0, 3);
  const otherFriends = friends.slice(3, 13);

  return (
    <ImageBackground
      source={require("../../assets/HD/blue_sky_no_clouds.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <Header header={`Leaderboard!`} />
      <ScrollView className="flex-1 w-full">
        <View className="pt-5">
          <View className="mx-auto px-5">
            <View className="flex-row">
              {topThree[1] ? (
                <View className="mx-auto items-center" style={{ marginTop: 23 }}>
                  <Text className="font-zcool text-xl text-white">
                    {topThree[1].username}
                  </Text>
                  <Text className="font-zcool text-lg text-white">
                    {topThree[1].experiencePoints} XP
                  </Text>
                  <Image
                    source={getUserBodyIcon(topThree[1].icon)}
                    style={{ width: 128, height: 128 }}
                    resizeMode="stretch"
                  />
                </View>
              ) : (
                <View className="mx-auto items-center" style={{ marginTop: 23 }}>
                  <Text className="font-zcool text-xl text-transparent">
                    name
                  </Text>
                  <Text className="font-zcool text-lg text-transparent">
                    XP
                  </Text>
                  <View
                    style={{ width: 128, height: 128 }}
                  />
                </View>
              )}
              {topThree[0] ? (
                <View
                  className="mx-auto items-center"
                  style={{ marginTop: -20 }}
                >
                  <Text className="font-zcool text-xl text-white">
                    {topThree[0].username}
                  </Text>
                  <Text className="font-zcool text-lg text-white">
                    {topThree[0].experiencePoints} XP
                  </Text>
                  <Image
                    source={getUserBodyIcon(topThree[0].icon)}
                    style={{ width: 128, height: 128 }}
                    resizeMode="stretch"
                  />
                </View>
              ) : (
                <View
                  className="mx-auto items-center"
                  style={{ width: 128, height: 128 }}
                ></View>
              )}
              {topThree[2] ? (
                <View className="mx-auto items-center" style={{ marginTop: 50 }}>
                  <Text className="font-zcool text-xl text-white">
                    {topThree[2].username}
                  </Text>
                  <Text className="font-zcool text-lg text-white">
                    {topThree[2].experiencePoints} XP
                  </Text>
                  <Image
                    source={getUserBodyIcon(topThree[2].icon)}
                    style={{ width: 128, height: 128 }}
                    resizeMode="stretch"
                  />
                </View>
              ) : (
                <View className="mx-auto items-center" style={{ marginTop: 50 }}>
                  <Text className="font-zcool text-xl text-transparent">
                    name
                  </Text>
                  <Text className="font-zcool text-lg text-transparent">
                    XP
                  </Text>
                  <View
                    style={{ width: 128, height: 128 }}
                  />
                </View>
              
              )}
            </View>
            <View style={{ marginTop: -70 }}>
              <Image
                source={require("../../assets/HD/podium.png")}
                className="w-[89vw] h-[59vw]"
                resizeMode="cover"
              ></Image>
            </View>
          </View>
          
          <FlatList
            data={otherFriends}
            renderItem={renderFriends}
            keyExtractor={(item: User) => item.$id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Leaderboard;
