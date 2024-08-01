import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import QuestBitDetail from "../../components/QuestBitDetail";
import QuestBitEdit from "../../components/QuestBitEdit";
import { router } from "expo-router";
import { QuestBit } from "@/constants/types";

const QuestBitDetails = () => {
  const parseQuestBit = (data: string): QuestBit => {
    const parsedData = JSON.parse(data);

    if (parsedData.dueDates && Array.isArray(parsedData.dueDates)) {
      parsedData.dueDates = parsedData.dueDates.map(
        (dateStr: string) => new Date(dateStr)
      );
    }

    return parsedData as QuestBit;
  };

  const { questbit } = useLocalSearchParams();
  const item: QuestBit = parseQuestBit(questbit as string);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    setIsEditing(false);
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
          <TouchableOpacity onPress={toggleEditing}>
            <AntDesign name="form" size={25} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {isEditing ? (
        <QuestBitEdit
          item={item}
          toggleEditing={toggleEditing}
          saveChanges={saveChanges}
        />
      ) : (
        <QuestBitDetail item={item} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "PressStart2P",
    color: "black",
  },
  label: {
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "ZCOOL",
    color: "gray",
    marginBottom: 3,
    marginTop: 9,
  },
  title: {
    fontFamily: "ZCOOL",
    fontSize: 32,
  },
});

export default QuestBitDetails;
