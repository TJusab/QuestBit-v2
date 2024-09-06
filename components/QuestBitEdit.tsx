import React, { useState, useEffect } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome5";
import StatusButton from "./StatusButton";
import RecurrenceButton from "./RecurrenceButton";
import DifficultyButton from "./DifficultyButton";
import PixelButton from './PixelButton';
import AddPeopleModal from "./AddPeoplePopUp";
import { QuestBit, User } from "@/constants/types";
import { getColorFromStatus, getColorFromDifficulty, getEnumFromStatus, getPointsFromDifficulty, getTextFromDates, getColorFromRecurrence } from "@/utils/utils";
import { getUserBodyIcon } from "@/utils/icon";
import CalendarModal from "./CalendarPopUp";
import { Difficulty, Recurrence } from "../constants/enums";
import { updateQuestBit } from '../lib/database';
import { useSafeAreaFrame } from "react-native-safe-area-context";

interface QuestBitEditProps {
  item: QuestBit;
  toggleEditing: () => void;
}

const QuestBitEdit: React.FC<QuestBitEditProps> = ({ item, toggleEditing }) => {
  const [questBit, setQuestBit] = useState(item);

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const [peopleVisible, setPeopleVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);

  const handleAddAdventurers = (adventurers: User[]) => {
    setSelectedAdventurers(adventurers);
    setQuestBit(prevItem => {
      const newAdventurers = adventurers.filter(
        adventurer => !(prevItem.assignees || []).some(assignee => assignee.$id === adventurer.$id)
      );
      
      const updatedAssignees = [...(prevItem.assignees || []), ...newAdventurers];
      return { ...prevItem, assignees: updatedAssignees };
    });
  };
  
  const handleRemoveAssignee = (adventurer: User) => {
    setQuestBit(prevItem => {
      const updatedAssignees = (prevItem.assignees || []).filter(assignee => assignee.$id !== adventurer.$id);
      return { ...prevItem, assignees: updatedAssignees };
    });
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
  const [selectedRecurrence, setSelectedRecurrence] = useState(getTextFromDates(item.dueDates));
  const [recurrenceColor, setRecurrenceColor] = useState<"red" | "blue" | "pink" | "yellow" | "green">(getColorFromRecurrence(selectedRecurrence));

  useEffect(() => {
    if (item.dueDates && item.dueDates.length > 0) {
      const initialDate = item.dueDates[0].toISOString().split('T')[0];
      setSelectedDate(initialDate);
      setFormattedDate(formatDateString(initialDate));
      setSelectedRecurrence(getTextFromDates(item.dueDates));
    }
  }, [item.dueDates]);

  const deadline = questBit.quests.deadline;

  const handleRecurrenceUpdate = (newRecurrence: string) => {
    setSelectedRecurrence(newRecurrence);
    setRecurrenceColor(getColorFromRecurrence(newRecurrence));

    let newDueDates: Date[] = [];

    switch (newRecurrence) {
      case Recurrence.NoRepeat:
        newDueDates = [new Date(selectedDate)];
        break;
      case Recurrence.Daily:
        newDueDates = calculateDailyDueDates(new Date(selectedDate), deadline);
        break;
      case Recurrence.Weekly:
        newDueDates = calculateWeeklyDueDates(new Date(selectedDate), deadline);
        break;
      case Recurrence.BiWeekly:
        newDueDates = calculateBiWeeklyDueDates(new Date(selectedDate), deadline);
        break;
      case Recurrence.Monthly:
        newDueDates = calculateMonthlyDueDates(new Date(selectedDate), deadline);
        break;
      case Recurrence.Annually:
        newDueDates = calculateAnnuallyDueDates(new Date(selectedDate), deadline);
        break;
      default:
        newDueDates = [new Date(selectedDate)];
        break;
    }
    setDueDates(newDueDates);
  };

  const calculateDailyDueDates = (startDate: Date, deadline: Date): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());
  
    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setDate(currentDateUTC.getDate() + 1);
    }

    return dueDates;
  };

  const calculateWeeklyDueDates = (startDate: Date, deadline: Date): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);
  
    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());
  
    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setDate(currentDateUTC.getDate() + 7);
    }
  
    return dueDates;
  };
  

  const calculateBiWeeklyDueDates = (startDate: Date, deadline: Date): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());
  
    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setDate(currentDateUTC.getDate() + 14);
    }

    return dueDates;
  };

  const calculateMonthlyDueDates = (startDate: Date, deadline: Date): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());

    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setMonth(currentDateUTC.getMonth() + 1);
    }

    return dueDates;
  };

  const calculateAnnuallyDueDates = (startDate: Date, deadline: Date): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());

    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setFullYear(currentDateUTC.getFullYear() + 1);
    }

    return dueDates;
  };

  const [selectedStatus, setSelectedStatus] = useState(item.status.toString());
  const [statusColor, setStatusColor] = useState<"red" | "blue" | "pink" | "yellow" | "green">(getColorFromStatus(item.status));

  const handleStatusUpdate = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setStatusColor(getColorFromStatus(getEnumFromStatus(newStatus)));
  };

  const [selectedDifficulty, setSelectedDifficulty] = useState(item.difficulty);
  const [difficultyColor, setDifficultyColor] = useState<"red" | "blue" | "pink" | "yellow" | "green">(getColorFromDifficulty(item.difficulty));

  const handleDifficultyUpdate = (newDifficulty: string) => {
    setSelectedDifficulty(Difficulty[newDifficulty as keyof typeof Difficulty]);
    setDifficultyColor(getColorFromDifficulty(Difficulty[newDifficulty as keyof typeof Difficulty]));
  };

  const handleSave = async () => {
    try {
      const updatedQuestBit = {
        id: questBit.$id,
        title,
        description,
        dueDates: dueDates,
        difficulty: selectedDifficulty,
        status: getEnumFromStatus(selectedStatus),
        quests: questBit.quests,
        assignees: (questBit.assignees || []).map(assignee => assignee.$id)
      };
      await updateQuestBit(updatedQuestBit);
      toggleEditing();
    } catch (error) {
      console.error("Failed to save changes:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
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
        <TextInput
          style={styles.description}
          value={description}
          onChangeText={setDescription}
          placeholder={item.description}
          multiline
        />
      </View>
      <View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.rowElement]}>Status</Text>
          <StatusButton
            color={statusColor}
            text={selectedStatus.toString()}
            textStyle="text-sm"
            onUpdate={handleStatusUpdate}
          />
        </View>
        <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginBottom: 15, marginTop: 15 }}></View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.rowElement]}>Difficulty</Text>
          <DifficultyButton
            color={difficultyColor}
            text={selectedDifficulty + "  |  " + getPointsFromDifficulty(item.difficulty) + " XP"}
            textStyle="text-sm"
            onUpdate={handleDifficultyUpdate}
          />
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginBottom: 15, marginTop: 15 }}></View>
      <View style={styles.section}>
        <View style={styles.edit_row}>
          <Text style={styles.label}>Assignee(s)</Text>
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
            except={questBit.assignees[0]} 
          />
        </View>
        <View style={styles.centeredRow}>
          {questBit.assignees && questBit.assignees.map((assignee) => (
            <View key={assignee.$id} style={styles.assignee}>
                <Image source={getUserBodyIcon(assignee.icon)} style={styles.character} />
                <TouchableOpacity
                  style={styles.remove_assignee}
                  onPress={() => handleRemoveAssignee(assignee)}>
                  <AntDesign name="minuscircle" size={25} color="red" />
                </TouchableOpacity>
              <Text style={styles.username}>{assignee.username}</Text>
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
          onPress={handleSave}
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
  character: {
    width: 90,
    height: 90,
    marginTop: 13,
  },
  title: {
    marginTop: 20,
    fontFamily: 'ZCOOL',
    fontSize: 32,
    borderWidth: 2,
    borderRadius: 15,
    padding: 4,
  },
  username: {
    fontFamily: "ZCOOL",
    fontSize: 18,
    textAlign: "center",
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
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
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
  centeredRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
    position: 'relative'
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
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start", 
      marginBottom: 10,
    },
  });
  
  
export default QuestBitEdit;
