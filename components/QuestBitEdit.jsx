import React, { useState } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StatusButton from "./StatusButton";

const QuestBitEdit = ({ item, toggleEditing, getTextFromStatus, getColorFromStatus, saveChanges }) => {
  const [title, setTitle] = useState(item.title);

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 20 }}>
        <View>
          <View style={styles.edit_row}>
            <Text style={styles.edit_label}>Title</Text> 
            <AntDesign name="form" size={20} color="black" />
          </View>
          <TextInput
            style={styles.edit_input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View>
          <View style={styles.edit_row}>
            <Text style={styles.edit_label}>Due Date</Text>
            <AntDesign name="form" size={20} color="black" />
          </View>
          <View>
            <MaterialIcons name="event" size={20} color="black" />
            <Text>{item.dueDates[0].substring(0, 10)}</Text>
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
            style={{ alignSelf: "flex-start" }}
            color={getColorFromStatus(item.status)}
            text={getTextFromStatus(item.status)}
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
          {item.assignees.map((assignee) => (
            <View key={assignee.$id} style={{ alignItems: "center", marginRight: 10 }}>
              <Image
                source={require("../assets/HD/character_48X48.png")}
                style={styles.character}
                resizeMethod="stretch"
              />
              <TouchableOpacity
                style={styles.remove_assignee}>
                  <AntDesign name="minuscircle" size={25} color="red" />
              </TouchableOpacity>
              <Text style={styles.username}>{assignee.username}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={saveChanges} style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleEditing} style={styles.button}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    edit_row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10, // Added marginBottom to separate rows
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
    character: {
      width: 90,
      height: 90,
      marginBottom: 10,
    },
    header: {
      marginTop: 20,
      fontSize: 18,
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
      marginBottom: 3,
      marginTop: 9,
      fontFamily: "ZCOOL", // Added fontFamily for consistency
      color: "gray", // Added color for consistency
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
      marginBottom: 10, // Added marginBottom for spacing
      fontFamily: "ZCOOL", // Added fontFamily for consistency
    },
    button: {
      backgroundColor: "blue", // Example background color for buttons
      padding: 10,
      marginTop: 10,
      alignItems: "center",
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 18,
      color: "white",
      fontFamily: "ZCOOL",
    },
    edit_input: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      padding: 8,
      fontSize: 18,
      marginBottom: 10, // Added marginBottom for spacing
      fontFamily: "ZCOOL", // Added fontFamily for consistency
    },
  });
  
  
export default QuestBitEdit;
