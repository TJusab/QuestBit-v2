import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import PixelButton from './PixelButton';
import { sendFriendshipInvite, fetchFriendshipSuggestions } from '../lib/database';
import { getUserIcon } from '../utils/icon'
import { User } from '@/constants/types';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);

  useEffect(() => {
    // Fetch suggestions on component mount
    const fetchSuggestions = async () => {
      try {
        const users = await fetchFriendshipSuggestions();
        setSuggestions(users);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, []);

  const renderItem = ({ item }: { item: User}) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Image
        source={getUserIcon(item.icon)}
        style={{ width: 64, height: 64, marginRight: 10 }}
        resizeMode="stretch"
      />
      <Text style={{ fontSize: 18, color: 'white', flex: 1 }}>{item.username}</Text>
      <PixelButton
        text="Add friend"
        textStyle="text-sm"
        color="blue"
        onPress={() => sendFriendshipInvite(item.$id)}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 24, color: 'white', marginBottom: 10 }}>Suggested for you</Text>
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

export default Suggestions;
