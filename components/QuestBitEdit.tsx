import React, { useState, useEffect } from "react";
import { Image, View, Text, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome5";
import StatusButton from "./StatusButton";
import RecurrenceButton from "./RecurrenceButton";
import DifficultyButton from "./DifficultyButton";
import PixelButton from './PixelButton';
import AddPeopleModal from "./AddPeoplePopUp";
import { QuestBit, User } from "@/constants/types";
import { getColorFromStatus, getColorFromDifficulty, getPointsFromDifficulty, getTextFromDates, getColorFromRecurrence } from "@/utils/utils";
import { getUserBodyIcon } from "@/utils/icon";
import CalendarModal from "./CalendarPopUp";
import { Status } from "../constants/enums";

interface QuestBitEditProps {
  item: QuestBit;
  toggleEditing: () => void;
  saveChanges: () => void;
}

const QuestBitEdit: React.FC<QuestBitEditProps> = ({ item, toggleEditing, saveChanges }) => {

  const sendUpdate = () => {
    saveChanges();

  };

  const [peopleVisible, setPeopleVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);
  const handleAddAdventurers = (adventurers: User[]) => {
    setSelectedAdventurers(adventurers);
  };

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  };
  
  const handleDateUpdate = (dateString: string) => {
    setSelectedDate(dateString);
    setFormattedDate(formatDateString(dateString));
  };
  
  const [dueDates, setDueDates] = useState<Date[]>([]);
  const [selectedRecurrence, setSelectedRecurrence] = useState("");
  const [recurrenceColor, setRecurrenceColor] = useState<"red" | "blue" | "pink" | "yellow" | "green">("green");


  useEffect(() => {
    if (item.dueDates && item.dueDates.length > 0) {
      const initialDate = item.dueDates[0].toISOString().split('T')[0];
      setSelectedDate(initialDate);
      setFormattedDate(formatDateString(initialDate));
      setSelectedRecurrence(getTextFromDates(item.dueDates));
    }
    setSelectedRecurrence(getTextFromDates(item.dueDates));
    setRecurrenceColor(getColorFromRecurrence(selectedRecurrence));

    setStatusColor(getColorFromStatus(item.status));

    console.log(item)
  }, [item.dueDates]);


  const handleRecurrenceUpdate = (newRecurrence: string) => {
    setSelectedRecurrence(newRecurrence);
    setRecurrenceColor(getColorFromRecurrence(newRecurrence));
  };

  const [selectedStatus, setSelectedStatus] = useState<Status>(item.status);
  const [statusColor, setStatusColor] = useState<"red" | "blue" | "pink" | "yellow" | "green">("green");
  const handleStatusUpdate = (newStatus: Status) => {
    setSelectedStatus(newStatus);
    setStatusColor(getColorFromStatus(newStatus))
  }
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.row}>
        <RecurrenceButton
          color={recurrenceColor}
          text={selectedRecurrence}
          textStyle="text-sm"
          onUpdate={handleRecurrenceUpdate}
        />
        <View style={{ marginRight: 10 }}></View>
        <Text style={[styles.label, styles.rowElement]}>Due : </Text>
        <TouchableOpacity
          onPress={() => setIsCalendarVisible(true)}
          className="flex-row items-center mt-2"
        >
          <Icon name="clock" size={20} color="#000" />
          <Text className="font-zcool text-black text-xl">
            {formattedDate}
          </Text>
        </TouchableOpacity>
        <CalendarModal
          visible={isCalendarVisible}
          onClose={() => setIsCalendarVisible(false)}
          onUpdate={handleDateUpdate}
          initialDate={selectedDate}
        />
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
            text={selectedStatus.toString()}
            textStyle="text-sm"
            onUpdate={handleStatusUpdate}
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
          <TouchableOpacity onPress={() => setPeopleVisible(true)}>
            <AntDesign name="pluscircle" size={25} color="green" />
          </TouchableOpacity>
          <AddPeopleModal
            visible={peopleVisible}
            onClose={() => setPeopleVisible(false)}
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
      <View style={styles.buttons}>
        <PixelButton
          text="Cancel"
          textStyle="text-sm"
          color="red"
          onPress={toggleEditing}
        />
        <View style={{ margin: 20 }}></View>
        <PixelButton
          text="Save"
          textStyle="text-sm"
          color="green"
          onPress={sendUpdate}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 70,
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
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: 'center',
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
