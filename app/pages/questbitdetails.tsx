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
import { router } from "expo-router";
import StatusButton from "../../components/StatusButton";
import { QuestBit } from "@/constants/types";
import { getColorFromStatus } from "../../utils/utils";

const QuestBitDetails = () => {
  const parseQuestBit = (data: string): QuestBit => {
    const parsedData = JSON.parse(data);

    if (parsedData.dueDates && Array.isArray(parsedData.dueDates)) {
      parsedData.dueDates = parsedData.dueDates.map((dateStr: string) => new Date(dateStr));
    }

    return parsedData as QuestBit;
  }

  const { questbit } = useLocalSearchParams();
  const item: QuestBit = parseQuestBit(questbit as string);
  const [isEditing, setIsEditing] = useState(false);


  const toggleEditing = () => {
    setIsEditing(!isEditing);
    console.log(item);
  };

  //   const handleRecurrenceChange = (value) => {
  //     console.log("Recurrence changed:", value);
  //   };

  const renderShow = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 20,
        }}
      >
        <View>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.label}>Due Date</Text>
          <View>
            <MaterialIcons name="event" size={20} color="black" />
            <Text>
              {item.dueDates && item.dueDates.length > 0
                ? item.dueDates[0].toLocaleDateString()
                : ""}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.label}>Recurrence</Text>
        <Text style={styles.value}>Annually</Text>
      </View>
      <View>
        <Text style={styles.label}> Status</Text>
        <View
          pointerEvents="none"
          style={{ flexDirection: "row", alignItems: "flex-start" }}
        >
          <StatusButton
            color={getColorFromStatus(item.status)}
            text={item.status}
            textStyle="text-sm"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{item.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Assignee(s)</Text>
        <View style={styles.row}>
          {item.assignees && item.assignees.map((assignee) => (
            <View
              key={assignee.$id}
              style={{ alignItems: "center", marginRight: 10 }}
            >
              <Image
                source={require("../../assets/HD/character_48X48.png")}
                style={styles.character}
              />
              <Text style={styles.username}>{assignee.username}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.label}>QuestBit Diary</Text>
        <View style={styles.log}>
          <Image
            source={require("../../assets/HD/scroll_small.png")}
            style={styles.scroll}
          />
        </View>
      </View>
    </View>
  );

  const RenderEdit = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 20,
        }}
      >
        <View>
          <View style={styles.edit_row}>
            <Text style={styles.edit_label}>Title</Text>
            <AntDesign name="form" size={20} color="black" />
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <View style={styles.edit_row}>
            <Text style={styles.edit_label}>Due Date</Text>
            <AntDesign name="form" size={20} color="black" />
          </View>
          <View>
            <MaterialIcons name="event" size={20} color="black" />
            <Text>
              {item.dueDates && item.dueDates.length > 0
                ? item.dueDates[0].toLocaleDateString()
                : ""}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.edit_row}>
          <Text style={styles.edit_label}>Recurrence</Text>
          <AntDesign name="form" size={20} color="black" />
        </View>
        <Text style={styles.value}>Annually</Text>
      </View>
      <View>
        <View style={styles.edit_row}>
          <Text style={styles.edit_label}> Status</Text>
          <AntDesign name="form" size={25} color="black" />
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <StatusButton
            color={getColorFromStatus(item.status)}
            text={item.status}
            textStyle="text-sm"
          />
        </View>
      </View>
      <View>
        <View style={styles.edit_row}>
          <Text style={styles.edit_label}>Description</Text>
          <AntDesign name="form" size={25} color="black" />
        </View>
        <Text style={styles.value}>{item.description}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.edit_row}>
          <Text style={styles.edit_label}>Assignee(s)</Text>
          <AntDesign name="pluscircle" size={25} color="green" />
        </View>
        <View style={styles.row}>
          {item.assignees && item.assignees.map((assignee) => (
            <View
              key={assignee.$id}
              style={{ alignItems: "center", marginRight: 10 }}
            >
              <Image
                source={require("../../assets/HD/character_48X48.png")}
                style={styles.character}
              />
              <TouchableOpacity style={styles.remove_assignee}>
                <AntDesign name="minuscircle" size={25} color="red" />
              </TouchableOpacity>
              <Text style={styles.username}>{assignee.username}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 30 }}>
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
      <Text style={styles.header}>QuestBit Details</Text>
      <View>
        <Text style={styles.label}>Quest</Text>
        <Text style={styles.title}>to do later</Text>
      </View>
      {isEditing ? <RenderEdit /> : renderShow()}
    </View>
  );
};

const styles = StyleSheet.create({
  log: {
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  edit_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  remove_assignee: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    width: "120%",
    height: "100%",
    marginBottom: 10,
    marginTop: -35,
  },
  character: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontFamily: "ZCOOL",
    fontSize: 32,
  },
  username: {
    fontFamily: "ZCOOL",
    fontSize: 18,
    marginBottom: -10,
  },
  header: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "PressStart2P",
    color: "black",
  },
  quest: {
    fontSize: 32,
    fontFamily: "ZCOOL",
    color: "black",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "ZCOOL",
    color: "gray",
    marginBottom: 3,
    marginTop: 9,
  },
  edit_label: {
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "ZCOOL",
    color: "gray",
    marginBottom: 3,
    marginTop: 9,
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    fontFamily: "ZCOOL",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    width: 100,
    height: 20,
    backgroundColor: "gray",
  },
  assignee: {
    alignItems: "center",
    marginRight: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 8,
    fontSize: 18,
    fontFamily: "ZCOOL",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default QuestBitDetails;
