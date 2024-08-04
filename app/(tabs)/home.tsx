import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Header from "../../components/Header";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getQuestBitsForUser } from "../../lib/database";
import QuestBitCard from "@/components/QuestBitCard";
import SearchInput from "@/components/SearchInput";
import { QuestBit } from "../../constants/types";
import { updateQuestBitStatus } from "../../lib/database";
import { router } from "expo-router";

const Home: React.FC = () => {
  const { user, questbits, setQuestBits } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredQuestBits, setFilteredQuestBits] = useState<QuestBit[]>([]);

  const fetchQuestBits = async () => {
    try {
      const response = await getQuestBitsForUser();
      setQuestBits(response);
      setFilteredQuestBits(response);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleQuestBitUpdate = async (questbitId: string, newStatus: string) => {
    setLoading(true);
    try {
      await updateQuestBitStatus(questbitId, newStatus);
      await fetchQuestBits();
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (questbits.length > 0) {
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
                <Header header={`Hello ${user?.username}!`} />
                <View className="mx-5 mb-5 shadow-xl shadow-black">
                  <SearchInput
                    placeholder="Search QuestBit..."
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
                  <QuestBitCard item={item} onUpdate={handleQuestBitUpdate} />
                )}
              />
            </ImageBackground>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/pages/create_questbit")}
            >
              <Image
                source={require("../../assets/HD/add_button.png")}
                style={{ width: 48, height: 48 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default Home;
