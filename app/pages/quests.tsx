import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { updateQuestBitStatus, getQuestBitsForQuest } from "../../lib/database";
import QuestBitCard from "@/components/QuestBitCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Quest, QuestBit } from "../../constants/types";
import { useLocalSearchParams, router } from "expo-router";
import NoQuestBits from "../../components/NoQuestbits";

const Quests = () => {

  const parseQuest = (data: string): Quest => {
    const parsedData = JSON.parse(data);
    if (parsedData.deadline) {
      parsedData.deadline = new Date(parsedData.deadline);
    }
    return parsedData as Quest;
  };

  const { quest } = useLocalSearchParams();
  const item: Quest = parseQuest(quest as string);  

  const [questbits, setQuestBits] = useState<QuestBit[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredQuestBits = questbits.filter(
    (questbit: QuestBit) => questbit.quests.$id === item.$id
  );

  const fetchQuestBits = async () => {
    setLoading(true); 
    try {
      const response = await getQuestBitsForQuest(item);
      setQuestBits(response);  
    } catch (error) {
      Alert.alert("Error", (error as Error).message);  
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    console.log(item)
    fetchQuestBits(); 
  }, []);

  const handleQuestBitUpdate = async (questbitId: string, newStatus: string) => {
    setLoading(true);  // Set loading while updating
    try {
      await updateQuestBitStatus(questbitId, newStatus);  
    } catch (error) {
      Alert.alert("Error", (error as Error).message);  
    } finally {
      setLoading(false);  
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#6E7591" size="large" />  
        </View>
      ) : filteredQuestBits.length === 0 ? (
        <NoQuestBits />
      ) : (
        <ImageBackground
          source={require("../../assets/HD/backgrounds/sky_clouds.png")}
          style={styles.backgroundImage}
          resizeMode="stretch"
        >
          <TouchableOpacity onPress={() => router.back()} className="ml-10 mt-10">
            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          </TouchableOpacity>
          <FlatList
            data={filteredQuestBits}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <QuestBitCard item={item} onUpdate={handleQuestBitUpdate} />
            )}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </ImageBackground>
      )}
    </View>
  );
};

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
});

export default Quests;
