import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Header from "../../components/Header";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getQuestBitsForUser } from "../../lib/database";
import QuestBit from "../../components/QuestBit";
import SearchInput from "../../components/SearchInput";
import { globalStyles } from "../global_css";

const Home = () => {
  const { user } = useGlobalContext();
  const [questbits, setQuestBits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredQuestBits, setFilteredQuestBits] = useState([]);

  const fetchQuestBits = async () => {
    try {
      const response = await getQuestBitsForUser();
      setQuestBits(response);
      setFilteredQuestBits(response); // Initialize filtered list
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestBits();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredQuestBits(questbits);
    } else {
      const filtered = questbits.filter((qb) =>
        qb.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredQuestBits(filtered);
    }
  }, [searchText, questbits]);

  const handleQuestBitUpdate = async () => {
    setLoading(true);
    await fetchQuestBits();
  };

  return (
    <SafeAreaView className="h-full">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#6E7591" size="large" />
        </View>
      ) : (
        <View>
          <ImageBackground
            source={require("../../assets/HD/blue_sky.png")}
            className="w-full h-full"
            resizeMode="stretch"
          >
            <View>
              <Header header={`Hello ${user.username}!`} />
              <View className="mx-5 mb-5">
                <SearchInput
                  value={searchText}
                  handleChangeText={setSearchText}
                />
              </View>
              <Text className="font-press text-lg text-black text-justify mt-5 mx-5">
                My QuestBits
              </Text>
            </View>
            <FlatList
              data={filteredQuestBits}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <QuestBit item={item} onUpdate={handleQuestBitUpdate} />
              )}
            />
          </ImageBackground>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
