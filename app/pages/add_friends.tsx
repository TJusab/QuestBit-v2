import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ListRenderItem,
  FlatList
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import PixelButton from "../../components/PixelButton";
import IconButton from "../../components/IconButton";
import SearchInput from "../../components/SearchInput";
import {
  acceptFriendshipInvite,
  sendFriendshipInvite,
  deleteFriendship,
  fetchReceivedFriendshipInvitations,
  fetchFriendshipSuggestions,
} from "../../lib/database";
import { getUserIcon } from "../../utils/icon";
import { Friendship, User } from "@/constants/types";

const AddFriends = () => {
  const [friendshipRequests, setFriendshipRequests] = useState<Friendship[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadFriendshipRequests = async () => {
      try {
        const requests = await fetchReceivedFriendshipInvitations();
        setFriendshipRequests(requests);
      } catch (error) {
        console.error("Error fetching friendship requests:", error);
      }
    };

    loadFriendshipRequests();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const requests = await fetchFriendshipSuggestions();
        setSuggestions(requests);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    loadUsers();
  }, []);

  const handleAnsweringFriendshipInvite = async (friendId: string, accepted: boolean) => {
    try {
      if (accepted) {
        await acceptFriendshipInvite(friendId);
      } else {
        await deleteFriendship(friendId);
      }
      // Update local state of friendshipRequests
      const updatedRequests = friendshipRequests.filter(
        (request) => request.$id !== friendId
      );
      setFriendshipRequests(updatedRequests);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleSendingFriendshipInvite = async (friendId: string) => {
    try {
      sendFriendshipInvite(friendId);
      // Update local state of setUsers
      const updatedRequests = suggestions.filter(
        (request) => request.$id !== friendId
      );
      setSuggestions(updatedRequests);
    } catch (error) {
      console.error("Error adding friend:", error);
      // Handle error
    }
  };

  const renderFriendRequest: ListRenderItem<Friendship> = ({ item }) => (
    <View
    className="flex-row items-center mt-3"
    key={item.$id}
  >
    <Image
      source={getUserIcon(item.user.icon)}
      style={{ width: 64, height: 64 }}
      resizeMode="stretch"
    />
    <Text className="font-zcool text-lg mx-auto">
      {item.user.username}
    </Text>
    <View className="mx-2">
      <IconButton
        icon="reject"
        onPress={() =>
          handleAnsweringFriendshipInvite(
            item.$id,
            false
          )
        }
      />
    </View>
    <View>
      <IconButton
        icon="accept"
        onPress={() =>
          handleAnsweringFriendshipInvite(
            item.$id,
            true
          )
        }
      />
    </View>
  </View>
  );

  const filteredSuggestions = suggestions
    .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);

  const renderSuggestedUser: ListRenderItem<User> = ({ item }) => (
    <View className="flex-row items-center mt-3" key={item.$id}>
      <Image
        source={getUserIcon(item.icon)}
        style={{ width: 64, height: 64 }}
        resizeMode="stretch"
      />
      <Text className="font-zcool text-lg text-white mx-auto">
        {item.username}
      </Text>
      <PixelButton
        text="Add friend"
        textStyle="text-sm"
        color="blue"
        onPress={() =>
          handleSendingFriendshipInvite(item.$id)
        }
      />
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/HD/blue_sky.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView className="flex-1 w-full">
        <View className="bg-white rounded-b-3xl z-10 px-5">
          <View className="w-full">
            <View className="flex-row items-center justify-between mt-10">
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons
                  name="keyboard-backspace"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <View className="flex-1 items-center">
                <View className="flex-row items-center">
                  <Text className="font-zcool text-3xl mr-5">Add Friends</Text>
                </View>
              </View>
            </View>
            <View
              className="mx-3 mb-5 mt-5"
              style={{ minHeight: 100 }}
            >
              <Text className="font-zcool text-2xl text-navy">
                Friend requests
              </Text>
              <FlatList
                data={friendshipRequests}
                renderItem={renderFriendRequest}
                keyExtractor={(item : Friendship) => item.$id}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
        <View className="pt-5 px-5">
          <Text className="font-zcool text-2xl text-white">Find Friends</Text>
          <View className="my-5 mb-5">
            <SearchInput
              placeholder="Search user..."
              value={searchTerm}
              handleChangeText={setSearchTerm}
            />
          </View>
          <FlatList
            data={filteredSuggestions}
            renderItem={renderSuggestedUser}
            keyExtractor={(item: User) => item.$id}
            scrollEnabled={false}
          />
        </View>
        <View className="pt-5 px-5">
          <Text className="font-zcool text-2xl text-white">
            Suggested for you
          </Text>
          <View>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestedUser}
            keyExtractor={(item : User) => item.$id}
            scrollEnabled={false}
          />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddFriends;
