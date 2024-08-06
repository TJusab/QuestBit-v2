import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import StatusButton from "./StatusButton";
import { Quest, User } from "@/constants/types";
import { getUserBodyIcon } from "@/utils/icon";
import { getQuestIcon } from "@/utils/icon";
import { QuestIcon } from "@/constants/enums";
import PixelButton from './PixelButton';
import AntDesign from "react-native-vector-icons/AntDesign";
import AddPeopleModal from "./AddPeoplePopUp";

interface QuestEditProps {
  item: Quest;
  toggleEditing: () => void;
}

const QuestEdit: React.FC<QuestEditProps> = ({ item, toggleEditing }) => {
  const [quest, setQuest] = useState(item);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [formattedDate, setFormattedDate] = useState<string | undefined>(undefined);
  const [selectedIcon, setSelectedIcon] = useState<QuestIcon>(item.icon);

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  };
  
  useEffect(() => {
    const initialDate = item.deadline?.toISOString().split('T')[0];
    setSelectedDate(initialDate);
    if (initialDate) {
      setFormattedDate(formatDateString(initialDate));
    }
  }, [item.deadline]);
  
  const handleSave = () => {
    toggleEditing();
  }

  const handleRemoveAssignee = (adventurer: User) => {
    setQuest(prevItem => {
      const updatedAdventurers = (prevItem.adventurers || []).filter(assignee => assignee.$id !== adventurer.$id);
      return { ...prevItem, adventurers: updatedAdventurers };
    });
  };
  
  
  const [peopleVisible, setPeopleVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);
  const handleAddAdventurers = (adventurers: User[]) => {
    setSelectedAdventurers(adventurers);
    setQuest(prevItem => {
      const updatedAssignees = [...prevItem.adventurers || [], ...adventurers];
      return { ...prevItem, assignees: updatedAssignees };
    });
  };

  const [peopleVisibleAdmin, setPeopleVisibleAdmin] = useState(false);
  const [refreshKeyAdmin, setRefreshKeyAdmin] = useState(0);
  const [selectedAdmin, setSelectedAdmin] = useState<User[]>([]);
  const handleAddAdmin = (adventurer: User[]) => {
    quest.owner = adventurer[0];
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Image
          source={getQuestIcon(selectedIcon)}
          style={{ width: 140, height: 140 }}
        />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.row} pointerEvents="none">
        <Text style={[styles.label, styles.rowElement]}>Due : </Text>
        <Text className="font-zcool text-black text-xl">{formattedDate}</Text>
      </View>
      <View>
        <Text style={styles.description}>{item.questInfo}</Text>
      </View>
      <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginBottom: 15, marginTop: 15 }}></View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Admin</Text>
          <TouchableOpacity onPress={() => setPeopleVisibleAdmin(true)}>
              <AntDesign name="pluscircle" size={25} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <View style={styles.icon}>
              <Image
                source={getUserBodyIcon(item.owner.icon)}
                style={styles.character}
              />
              <Text style={styles.username}>{item.owner.username}</Text>
            </View>
        </View>
        <AddPeopleModal
            visible={peopleVisibleAdmin}
            onClose={() => setPeopleVisibleAdmin(false)}
            onUpdate={handleAddAdmin}
            selectedAdventurers={selectedAdmin}
            refreshKey={refreshKeyAdmin}
            text='Assign an admin to this Quest'
          />
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
            text='Assign adventurers to this Quest'
          />
        <View style={styles.row}>
          {quest.adventurers && quest.adventurers.map((assignee) => (
            <View key={assignee.$id}>
              <Image
                source={getUserBodyIcon(assignee.icon)}
                style={styles.character}
              />
              <TouchableOpacity 
                style={styles.remove_assignee}
                onPress={() => handleRemoveAssignee(assignee)}>
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
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 70,
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
  edit_row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start", 
    marginBottom: 10,
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
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: 'center',
  },
  date: {
    fontSize: 18,
    fontFamily: "ZCOOL",
    alignItems: 'center',
  },
  icon: {
    marginTop: 10,
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
});

export default QuestEdit;
