import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getQuestBits } from "../../lib/database";
import QuestBit from "../../components/QuestBit";
import DropdownMenu from "../../components/Dropdown";
import SearchInput from "../../components/SearchInput";
import { globalStyles } from '../global_css';

const Home = () => {
  const { user } = useGlobalContext();
  const filters = ["Today", "Upcoming", "Due Soon", "Completed"];
  const [questbits, setQuestBits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestBits = async () => {
    try {
      const response = await getQuestBits();
      setQuestBits(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestBits();
  }, []);

  const handleQuestBitUpdate = async () => {
    setLoading(true);
    await fetchQuestBits();
  };

  return (
    <SafeAreaView className="bg-blue-200 h-full">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#6E7591" size="large" />
        </View>
      ) : (
        <FlatList
          data={questbits}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <QuestBit item={item} onUpdate={handleQuestBitUpdate} />
          )}
          ListHeaderComponent={() => (
            <View>
              <Header />
              <View className="flex-1 w-full h-full">
                <Text className="font-press text-3xl text-center" style={globalStyles.title}>
                  Hello {user.username}!
                </Text>
                <View className="flex flex-row w-full items-center justify-between">
                  <SearchInput />
                  <DropdownMenu />
                </View>
                <View className="mt-10 mx-5">
                  <Text className="font-press text-xl text-navy text-justify">
                    My QuestBits
                  </Text>
                  <View className="flex-row justify-between mt-2 mb-5">
                    {filters.map((word, index) => (
                      <Text key={index} className="font-zcool text-lg">
                        {word}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
