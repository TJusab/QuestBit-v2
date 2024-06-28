import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

const QuestBitDetails = () => {
  const { questbit } = useLocalSearchParams();
  const item = questbit ? JSON.parse(questbit) : null;
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    console.log(item);
  };

  const back = () => {
    router.back();
  }

  const handleRecurrenceChange = (value) => {
    console.log("Recurrence changed:", value);
  };

  const renderQuestBitDetails = () => (
    <View>
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
        <Text style={styles.label}>Status</Text>
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
                source={require("../../assets/HD/character_48X48.png")}
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
            source={require("../../assets/HD/scroll_small.png")}
            style={styles.scroll}
            resizeMethod="stretch"
          />
        </View>
      </View>
    </View>
  );

  const EditableQuestItem = () => (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 20 }}>
        <View>
          <Text>Title</Text>
          <TextInput
            value={item.title}
            onChangeText={(text) => {}}
          />
        </View>
        <View>
          <Text>Status</Text>
          <TextInput
            value={item.status}
            onChangeText={(text) => {}}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 20 }}>
        <View>
          <Text>Due Date</Text>
          <View>
            <MaterialIcons name="event" size={20} color="black" />
            <Text>{item.dueDates[0].substring(0, 10)}</Text>
          </View>
        </View>
        <View>
          <Text>Recurrence</Text>
          <Picker
            selectedValue={item.recurrence}
            onValueChange={handleRecurrenceChange}
          >
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Annually" value="annually" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        </View>
      </View>
      <View>
        <Text>Description</Text>
        <TextInput
          multiline
          value={item.description}
          onChangeText={(text) => {}}
          style={styles.description}
        />
      </View>
      <View>
        <Text style={styles.label}>Assignee(s)</Text>
        <View style={{ flexDirection: "row" }}>
          {item.assignees.map((assignee) => (
            <View key={assignee.$id} style={{ alignItems: "center", marginRight: 10 }}>
              <Image
                source={require("../../assets/HD/character_48X48.png")}
                style={{ width: 90, height: 90, marginBottom: 10 }}
                resizeMode="stretch"
              />
              <Text style={styles.label}>{assignee.username}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 35 }}>
        <TouchableOpacity onPress={back}>
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
      {isEditing ? <EditableQuestItem /> : renderQuestBitDetails()}
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
