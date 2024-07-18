import React, { useState, useEffect } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StatusButton from "./StatusButton";
import PixelButton from './PixelButton';
import Dropdown from './Dropdown';
import AddPeopleModal from "./AddPeoplePopUp";
import { QuestBit } from "@/constants/types";
import { User } from "@/constants/types";
import { getColorFromStatus } from "@/utils/utils";
import { RecurrenceValue } from "@/constants/enums";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface QuestBitEditProps {
  item: QuestBit;
  toggleEditing: () => void;
  saveChanges: () => void;
}

const QuestBitEdit: React.FC<QuestBitEditProps> = ({ item, toggleEditing, saveChanges }) => {
  const [title, setTitle] = useState(item.title);

  const [items, setItems] = useState([
    { label: 'Never', value: 'Never' },
    { label: 'Weekly', value: 'Weekly' },
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

  // useEffect(() => {
  //   if (item.dueDates?.length === 1) {
  //     setStatus('Never');
  //   } else {
  //     setStatus('Yearly');
  //   }
  // }, [item.dueDates]);


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
    <View>
      <Text style={styles.header}>QuestBit Details</Text>
      <View>
        <Text style={styles.label}>Quest</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
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
            <Button title="Change Due Date" onPress={showDatePicker} />
            <DateTimePickerModal textColor="black"
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={date}
            />
          </View>
          <View>
            <MaterialIcons name="event" size={20} color="black" />
            <Text>{item.dueDates && item.dueDates[0].toLocaleDateString()}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.edit_row}>
          <Text style={styles.edit_label}>Recurrence</Text>
          <AntDesign name="form" size={20} color="black" />
        </View>
        <Dropdown initialValue={status} items={items} onChangeValue={onChangeValue} />
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
                source={require("../assets/HD/character_48X48.png")}
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
    </View>
  );
}
const styles = StyleSheet.create({
    edit_row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10, 
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
    title: {
      fontFamily: 'ZCOOL', 
      fontSize: 32,
    },
    character: {
      width: 90,
      height: 90,
      marginBottom: 10,
    },
    header: {
      marginTop: 65,
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
      fontFamily: "ZCOOL", 
      color: "gray",
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
      justifyContent:"center"
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
      marginBottom: 10, 
      fontFamily: "ZCOOL", 
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
    edit_input: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      padding: 8,
      fontSize: 18,
      marginBottom: 10, 
      fontFamily: "ZCOOL", 
    },
  });
  
  
export default QuestBitEdit;
