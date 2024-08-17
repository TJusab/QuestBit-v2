import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import QuestDetail from "../../components/QuestDetail";
import QuestEdit from "../../components/QuestEdit";
import { router } from "expo-router";
import { Quest, User } from "@/constants/types";
import { getCurrentUser } from "../../lib/account";

const QuestDetails = () => {
  const parseQuest = (data: string): Quest => {
    const parsedData = JSON.parse(data);

    if (parsedData.deadline) {
      parsedData.deadline = new Date(parsedData.deadline);
    }
    return parsedData as Quest;
  };

  const { quest } = useLocalSearchParams();
  const item: Quest = parseQuest(quest as string);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); 

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await getCurrentUser();
      setCurrentUser(res);
    };

    fetchCurrentUser();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      {!isEditing && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 35,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          </TouchableOpacity>
          {currentUser?.username === item.owner.username && (
            <TouchableOpacity onPress={toggleEditing}>
              <AntDesign name="form" size={25} color="black" />
            </TouchableOpacity>
          )}
        </View>
      )}
      {isEditing ? (
        <QuestEdit
          item={item}
          toggleEditing={toggleEditing}
        />
      ) : (
        <QuestDetail item={item} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

export default QuestDetails;
