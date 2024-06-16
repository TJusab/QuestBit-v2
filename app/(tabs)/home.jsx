import { Text, View, SafeAreaView, ScrollView, Alert } from "react-native";
import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const filters = ["Today", "Upcoming", "Due Soon", "Completed"];
  const [questbits, setQuestbits] = useState(true);

  useEffect(() => {
    const fetchQuestbits = async () => {
      try {
        const response = await getQuestbits();
        setQuestbits(response);
      } catch (error) {
        Alert.alert('Error', error.message);
      } 
    };

    fetchQuestbits();
  }, []);
  

  return (
    <SafeAreaView className="bg-blue-50 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Header />
        <View className="flex-1 w-full h-full">
          <Text className="font-press text-3xl text-navy text-center">
            Hello {user.username}
          </Text>
          <View className="mt-10 mx-10">
            <Text className="font-press text-xl text-navy text-justify">
              My QuestBits
            </Text>
            <View className="flex-row justify-between mt-2">
              {filters.map((word, index) => (
                <Text key={index} className="font-zcool text-md">
                  {word}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
