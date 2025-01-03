import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  ListRenderItem,
  FlatList
} from "react-native";
import IconButton from "../../components/IconButton";
import SearchInput from "../../components/SearchInput";
import DeletePopUp from "../../components/DeletePopUp";
import {
  deleteFriendship,
  fetchFriendships
} from "../../lib/database";
import { getUserIcon } from "../../utils/icon";
import { Friendship } from "@/constants/types";

const FriendList = () => {
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadFriendshipRequests = async () => {
      try {
        const result = await fetchFriendships();
        setFriendships(result);
      } catch (error) {
        console.error("Error fetching friendship requests:", error);
      }
    };

    loadFriendshipRequests();
  }, []);

  const handleDeletingFriendship = async (friendId: string, accepted: boolean) => {
    try {
      await deleteFriendship(friendId);
      // Update local state of friendships
      const updatedRequests = friendships.filter(
        (request) => request.$id !== friendId
      );
      setFriendships(updatedRequests);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const renderFriends: ListRenderItem<Friendship> = ({ item }) => (
    <View
    className="bg-white rounded-xl flex-row items-center p-2 px-5 my-2"
    key={item.$id}
  >
    <Image
      source={getUserIcon(item.user.icon)}
      style={{ width: 64, height: 64 }}
      resizeMode="stretch"
    />
    <View className="px-2">
      <Text className="font-zcool text-2xl">
        {item.user.username}
      </Text>
      <Text className="font-zcool text-lg text-gray">
        1351 XP
      </Text>
    </View>
    <View className="ml-auto">
      <IconButton
        icon="reject"
        onPress={() => setDeleteModalVisible(true)}
      />
    </View>
    <DeletePopUp
      visible={deleteModalVisible}
      onClose={() => setDeleteModalVisible(false)}
      handleDelete={() =>
        handleDeletingFriendship(
          item.$id,
          false
        )
      }
      text={"Are you sure you want to remove " + item.user.username + " from your friends ?"}
    />
  </View>
  );

  const filteredFriends = friendships
    .filter(friendship => friendship.user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);

  return (
    <ImageBackground
      source={require("../../assets/HD/backgrounds/sky_clouds.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView className="flex-1 w-full">
        <View className="pt-5 px-5">
          <Text className="font-zcool text-2xl text-white">Find friends</Text>
          <View className="my-5 mb-5">
            <SearchInput
              placeholder="Search user..."
              value={searchTerm}
              handleChangeText={setSearchTerm}
            />
          </View>
          <FlatList
            data={filteredFriends}
            renderItem={renderFriends}
            keyExtractor={(item: Friendship) => item.$id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default FriendList;
