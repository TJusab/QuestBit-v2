import {
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getQuestBits } from "../../lib/database";
import QuestBit from "../../components/QuestBit";
import SearchInput from "../../components/SearchInput";
import SelectCountryScreen from "../../components/Dropdown";

const Home = () => {
  const { user } = useGlobalContext();
  const filters = ["Today", "Upcoming", "Due Soon", "Completed"];
  const [questbits, setQuestBits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchQuestBits();
  }, []);

  return (
    <SafeAreaView className="bg-blue-50 h-full">
      {loading ? (
        <View className="flex justify-center items-center">
          <ActivityIndicator color="#6E7591" size="large" />
        </View>
      ) : (
        <FlatList
          data={questbits}
          keyExtractor={(item) => item.$id}
          renderItem={QuestBit}
          ListHeaderComponent={() => (
            <View>
              <Header />
              <View className="flex-1 w-full h-full">
                <Text className="font-press text-3xl text-navy text-center">
                  Hello {user.username}!
                </Text>
                <View className="flex-row mt-5 mx-5 items-center space-x-5">
                  <SearchInput value="Search questbits..." />
                  <SelectCountryScreen />
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
