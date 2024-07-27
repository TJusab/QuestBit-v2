import React, { useState, useEffect } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StatusButton from "./StatusButton";
import RecurrenceButton from "./RecurrenceButton";
import DifficultyButton from "./DifficultyButton";
import PixelButton from './PixelButton';
import AddPeopleModal from "./AddPeoplePopUp";
import { QuestBit } from "@/constants/types";
import { User } from "@/constants/types";
import { RecurrenceValue } from "@/constants/enums";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getColorFromStatus, getColorFromDifficulty, getPointsFromDifficulty, getTextFromDates, getColorFromDates} from "@/utils/utils";
import { getUserBodyIcon } from "@/utils/icon";

interface QuestBitEditProps {
  item: QuestBit;
  toggleEditing: () => void;
  saveChanges: () => void;
}

const QuestBitEdit: React.FC<QuestBitEditProps> = ({ item, toggleEditing, saveChanges }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const [items, setItems] = useState([
    { label: 'Easy | 50 XP', value: 'Easy' },
    { label: 'Medium | 100 XP', value: 'Medium' },
    { label: 'Every 2 Weeks', value: '2Weeks' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Yearly', value: 'Yearly' },
  ]);
  
  const [status, setStatus] = useState<RecurrenceValue>(RecurrenceValue.Daily);
  const [visible, setVisible] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);

  const handleAddAdventurers = (adventurers: User[]) => {
    setSelectedAdventurers(adventurers);
  };

  const onChangeValue = () => {

  }

  const [date, setDate] = useState(item.dueDates ? new Date(item.dueDates[0]) : new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.row}>
        <RecurrenceButton
          color={getColorFromDates(item.dueDates)}
          text={getTextFromDates(item.dueDates)}
          textStyle="text-sm"
        />
        <View style={{ marginRight: 10 }}></View>
        <Text style={[styles.label, styles.rowElement]}>Due : </Text>
        <Text style={[styles.date, styles.rowElement]}>{item.dueDates && item.dueDates[0].toLocaleDateString()}</Text>
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.rowElement]}>Status</Text>
          <StatusButton
            color={getColorFromStatus(item.status)}
            text={item.status}
            textStyle="text-sm"
          />
        </View>
        <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginBottom: 15, marginTop: 15 }}></View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.rowElement]}>Difficulty</Text>
          <DifficultyButton
            color={getColorFromDifficulty(item.difficulty)}
            text={item.difficulty + "  |  " + getPointsFromDifficulty(item.difficulty) + " XP"}
            textStyle="text-sm"
          />
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginBottom: 15, marginTop: 15 }}></View>
      <View style={styles.section}>
        <View style={styles.edit_row}>
          <Text style={styles.edit_label}>Assignee(s)</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
          <AntDesign name="pluscircle" size={25} color="green" />
          </TouchableOpacity>
          <AddPeopleModal
            visible={visible}
            onClose={() => setVisible(false)}
            onUpdate={handleAddAdventurers}
            selectedAdventurers={selectedAdventurers}
            refreshKey={refreshKey}
            text='Assign adventurers to this QuestBit'
          />
        </View>
        <View style={styles.edit_row}>
          {item.assignees && item.assignees.map((assignee) => (
            <View key={assignee.$id} style={{ alignItems: "center", marginRight: 10 }}>
              <Image
                source={getUserBodyIcon(assignee.icon)}
                style={styles.character}
              />
              <TouchableOpacity
                style={styles.remove_assignee}>
                  <AntDesign name="minuscircle" size={25} color="red" />
              </TouchableOpacity>
              <Text>{assignee.username}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.row}>
      <PixelButton
        text="Save"
        textStyle="text-sm"
        color="green"
        onPress={saveChanges}
      />
      <PixelButton
        text="Cancel"
        textStyle="text-sm"
        color="red"
        onPress={toggleEditing}
      />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
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
    marginTop: 20,
    fontFamily: 'ZCOOL',
    fontSize: 32,
  },
  username: {
    fontFamily: "ZCOOL",
    fontSize: 18,
    marginBottom: -10,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 27,
    fontWeight: "bold",
    fontFamily: "ZCOOL",
    color: "gray",
  },
  description: {
    fontSize: 18,
    fontFamily: "ZCOOL",
    marginBottom: 10,
    marginTop: 10,
  },
  date: {
    fontSize: 18,
    fontFamily: "ZCOOL",
    alignItems: 'center',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  rowElement: {
    marginRight: 10,
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
    button: {
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
    edit_label: {
      fontSize: 23,
      fontWeight: "bold",
      fontFamily: "ZCOOL",
      color: "gray",
      marginBottom: 3,
      marginTop: 9,
      marginRight: 10,
    },
    edit_row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10, 
    },
  });
  
  
export default QuestBitEdit;
