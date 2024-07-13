import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StatusButton from "./StatusButton";

const QuestBitDetail = ({ item }) => {
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
    }
  };

  const getTextFromStatus = (status) => {
    switch (status) {
      case "OnGoing":
        return "On Going";
      default:
        return status;
    }
  };

  return (
    <View>
        <Text style={styles.header}>QuestBit Details</Text>
      <View>
        <Text style={styles.label}>Quest</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 20 }}>
        <View>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.label}>Due Date</Text>
          <View>
            <MaterialIcons name="event" size={20} color="black" />
            <Text>{item.dueDates[0].substring(0, 10)}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.label}>Recurrence</Text>
        <Text style={styles.value}>Annually</Text>
      </View>
      <View>
        <Text style={styles.label}> Status</Text>
        <View pointerEvents="none" style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <StatusButton
            style={{ alignSelf: "flex-start" }}
            color={getColorFromStatus(item.status)}
            text={getTextFromStatus(item.status)}
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
          {item.assignees.map((assignee) => (
            <View key={assignee.$id} style={{ alignItems: "center", marginRight: 10 }}>
              <Image
                source={require("../assets/HD/character_48X48.png")}
                style={styles.character}
                resizeMethod="stretch"
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
            source={require("../assets/HD/scroll_small.png")}
            style={styles.scroll}
            resizeMethod="stretch"
          />
        </View>
      </View>
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'ZCOOL', 
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
    fontFamily: 'ZCOOL', 
    color: 'black',
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
    marginRight: 10
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

export default QuestBitDetail;
