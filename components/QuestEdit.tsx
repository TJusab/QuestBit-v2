import React, { useState, useEffect } from "react";
import { View, Text, Alert, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Quest, User } from "@/constants/types";
import { getUserBodyIcon } from "@/utils/icon";
import { getQuestIcon } from "@/utils/icon";
import { QuestIcon } from "@/constants/enums";
import PixelButton from './PixelButton';
import AntDesign from "react-native-vector-icons/AntDesign";
import AddPeopleModal from "./AddPeoplePopUp";
import CalendarModal from "./CalendarPopUp";
import { updateQuest } from '../lib/database';

interface QuestEditProps {
  item: Quest;
  toggleEditing: () => void;
}

const QuestEdit: React.FC<QuestEditProps> = ({ item, toggleEditing }) => {
  const [quest, setQuest] = useState(item);
  const [selectedIcon, setSelectedIcon] = useState<QuestIcon>(item.icon);
  const [peopleVisible, setPeopleVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);
  const [title, setTitle] = useState(item.title);
  const [info, setInfo] = useState(item.questInfo);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(item.deadline);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (item.deadline) {
      const initialDate = new Date(item.deadline);
      setSelectedDate(initialDate);
      setFormattedDate(formatDateString(initialDate));
    }
  }, [item.deadline]);

  const formatDateString = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  };

  const handleRemoveAssignee = (adventurer: User) => {
    setQuest(prevItem => {
      const updatedAdventurers = (prevItem.adventurers || []).filter(assignee => assignee.$id !== adventurer.$id);
      return { ...prevItem, adventurers: updatedAdventurers };
    });
  };

  const handleAddAdventurers = (adventurers: User[]) => {
    setSelectedAdventurers(adventurers);
    setQuest(prevItem => {
      const updatedAssignees = [...(prevItem.adventurers || []), ...adventurers];
      return { ...prevItem, adventurers: updatedAssignees };
    });
  };

  const handleDateUpdate = (dateString: string) => {
    const date = new Date(dateString);
    setSelectedDate(date);
    setFormattedDate(formatDateString(date));
  };


  const handleSave = async () => {
    try {
      const updatedQuest = {
        admin: quest.owner.$id,
        id: quest.$id,
        title: title || "",
        questInfo: info || "",
        icon: selectedIcon,
        deadline: selectedDate ? new Date(selectedDate) : null,
        adventurerIds: (quest.adventurers || []).map(adventurer => adventurer.$id),
        questbits: (quest.questbits || []).map(bit => bit.$id),
      };
  
      await updateQuest(updatedQuest);
      console.log("Quest updated successfully.");
      toggleEditing();
    } catch (error) {
      console.error("Failed to save changes:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };
  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Image source={getQuestIcon(selectedIcon)} style={{ width: 140, height: 140 }} />
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={setTitle}
        placeholder={item.title}
      />
      <View style={styles.row}>
        <Text style={[styles.label, styles.rowElement]}>Due :</Text>
        <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
          <Text className="font-zcool text-black text-xl">{formattedDate}</Text>
        </TouchableOpacity>
        <CalendarModal
          visible={isCalendarVisible}
          onClose={() => setIsCalendarVisible(false)}
          onUpdate={handleDateUpdate}
          initialDate={selectedDate?.toISOString().split('T')[0]}
        />
      </View>
      <View>
        <TextInput
          style={styles.description}
          value={info}
          onChangeText={setInfo}
          placeholder={item.questInfo}
          multiline
        />
      </View>
      <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginBottom: 15, marginTop: 15 }}></View>
      <View style={styles.section}>
        <Text style={styles.label}>Admin</Text>
        <View style={styles.centeredRow}>
          <View style={styles.assignee}>
            <View>
              <Image source={getUserBodyIcon(item.owner.icon)} style={styles.character} />
            </View>
            <Text style={styles.username}>{item.owner.username}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Assignee(s)</Text>
          <TouchableOpacity onPress={() => setPeopleVisible(true)}>
            <AntDesign name="pluscircle" size={25} color="green" />
          </TouchableOpacity>
        </View>
        <AddPeopleModal
          visible={peopleVisible}
          onClose={() => setPeopleVisible(false)}
          onUpdate={handleAddAdventurers}
          selectedAdventurers={selectedAdventurers}
          refreshKey={refreshKey}
          text="Assign adventurers to this Quest"
          except={item.owner}
        />
        <View style={styles.centeredRow}>
          {quest.adventurers && quest.adventurers.map((assignee) => (
            <View key={assignee.$id} style={styles.assignee}>
              <View>
                <Image source={getUserBodyIcon(assignee.icon)} style={styles.character} />
                <TouchableOpacity
                  style={styles.remove_assignee}
                  onPress={() => handleRemoveAssignee(assignee)}>
                  <AntDesign name="minuscircle" size={25} color="red" />
                </TouchableOpacity>
              </View>
              <Text style={styles.username}>{assignee.username}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <PixelButton text="Cancel" textStyle="text-sm" color="red" onPress={toggleEditing} />
        <View style={{ margin: 20 }}></View>
        <PixelButton text="Save" textStyle="text-sm" color="green" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 70,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start", 
    marginTop: 10,
  },
  rowElement: {
    marginRight: 10,
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
  character: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  title: {
    marginTop: 20,
    fontFamily: 'ZCOOL',
    fontSize: 32,
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
  },
  username: {
    fontFamily: "ZCOOL",
    fontSize: 18,
    textAlign: "center",
    marginTop: -5,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 27,
    fontWeight: "bold",
    fontFamily: "ZCOOL",
    color: "gray",
    marginBottom: 10,
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
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
  assignee: {
    alignItems: "center",
    marginRight: 10,
  },
});

export default QuestEdit;
