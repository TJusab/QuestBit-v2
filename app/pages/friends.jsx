import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';
import PixelButton from '../../components/PixelButton';
import SearchInput from "../../components/SearchInput";
import { getAccountFromId, acceptFriendshipInvite, sendFriendshipInvite, deleteFriendship, fetchReceivedFriendshipInvitations, fetchFriendshipSuggestions } from '../../lib/database';
import { getUserIcon } from '../../lib/icon';

const Friends = () => {
  const [friendshipRequests, setFriendshipRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadFriendshipRequests = async () => {
      try {
        const requests = await fetchReceivedFriendshipInvitations();
        setFriendshipRequests(requests);
      } catch (error) {
        console.error('Error fetching friendship requests:', error);
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
        console.error('Error fetching suggestions:', error);
      }
    };

    loadUsers();
  }, []);

  const handleAnsweringFriendshipInvite = async (friendId, accepted) => {
    try {
      if (accepted) {
        await acceptFriendshipInvite(friendId); // Assuming addFriend accepts friendId and performs the operation
      }
      else {
        await deleteFriendship(friendId);
      }
      // Update local state of friendshipRequests
      const updatedRequests = friendshipRequests.filter(request => request.$id !== friendId);
      setFriendshipRequests(updatedRequests);
    } catch (error) {
      console.error('Error adding friend:', error);
      // Handle error
    }
  };

  const handleSendingFriendshipInvite = async (friendId) => {
    try {
      sendFriendshipInvite(friendId);
      // Update local state of setUsers
      const updatedRequests = suggestions.filter(request => request.$id !== friendId);
      setSuggestions(updatedRequests);
    } catch (error) {
      console.error('Error adding friend:', error);
      // Handle error
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/HD/blue_sky.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView className="flex-1 w-full">
        <View className="bg-white rounded-b-3xl z-10 px-8">
          <View className="w-full">
            <View className="flex-row items-center justify-between mt-10">
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="keyboard-backspace" size={30} color="black" />
              </TouchableOpacity>
              <View className="flex-1 items-center">
                <View className="flex-row items-center">
                  <Text className="font-zcool text-3xl mr-5">Add Friends</Text>
                </View>
              </View>
            </View>
            <View className="flex-1 mx-3 items-top mb-10 mt-8" style={{ minHeight: 100 }}>
              <Text className="font-zcool text-2xl text-navy" >Friend requests</Text>
              { friendshipRequests.length > 0 && friendshipRequests.map((friendshipRequest) => (
                  <View className="flex-row items-center" key={friendshipRequest.$id}>
                    <Image
                      source={getUserIcon(friendshipRequest.user.icon)}
                      style={{ width: 80, height: 80 }}
                      resizeMode="stretch"
                    />
                    <Text className="font-zcool text-lg mx-auto">
                      {friendshipRequest.user.username}
                    </Text>
                    <PixelButton
                      text="Decline"
                      textStyle="text-sm"
                      color="red"
                      onPress={() => handleAnsweringFriendshipInvite(friendshipRequest.$id, false)}
                    />
                    <PixelButton
                      text="Accept"
                      textStyle="text-sm"
                      color="blue"
                      onPress={() => handleAnsweringFriendshipInvite(friendshipRequest.$id, true)}
                    />
                  </View>
                ))}
            </View>
          </View>
        </View>
        <View className="flex-1 pt-10 px-8" style={{ minHeight: 200 }}>
          <Text className="font-zcool text-2xl text-white" >Find Friends</Text>
          <View className="my-5 mb-5">
            <SearchInput
            />
          </View>
        </View>
        <View className="flex-1 pt-10 p-8">
          <Text className="flex-1 font-zcool text-2xl text-white" >Suggested for you</Text>
          <View>
            {suggestions.length > 0 &&
              suggestions.map((suggestedUser) => (
                <View className="flex-row items-center" key={suggestedUser.$id}>
                  <Image
                    source={getUserIcon(suggestedUser.icon)}
                    style={{ width: 64, height: 64 }}
                    resizeMode="stretch"
                  />
                  <Text className="font-zcool text-lg text-white mx-auto">
                    {suggestedUser.username}
                  </Text>
                  <PixelButton
                    text="Add friend"
                    textStyle="text-sm"
                    color="blue"
                    onPress={() => handleSendingFriendshipInvite(suggestedUser.$id)}
                  />
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Friends;
