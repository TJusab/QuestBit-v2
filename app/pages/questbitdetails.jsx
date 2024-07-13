import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import QuestBitDetail from "../../components/QuestBitDetail";
import QuestBitEdit from "../../components/QuestBitEdit";
import { router } from "expo-router";

const QuestBitDetails = () => {
  const { questbit } = useLocalSearchParams();
  const item = questbit ? JSON.parse(questbit) : null;


  const [isEditing, setIsEditing] = useState(false);

  const getTextFromStatus = (status) => {
    switch (status) {
      case "OnGoing":
        return "On Going";
      default:
        return status;
    }
  };

  const getColorFromStatus = (status) => {
    switch (status) {
      case "Unassigned":
        return "yellow";
      case "OnGoing":
        return "blue";
      case "Assigned":
        return "pink";
      case "Completed":
        return "green";
      default:
        return "gray";
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    setIsEditing(false); 
  };

  const back = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      {!isEditing && (
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 35 }}>
        <TouchableOpacity onPress={back}>
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
          getTextFromStatus={getTextFromStatus}
          getColorFromStatus={getColorFromStatus}
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
