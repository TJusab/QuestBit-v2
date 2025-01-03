import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Quest } from "@/constants/types";
import { getUserBodyIcon } from "@/utils/icon";
import { getQuestIcon } from "@/utils/icon";
import { QuestIcon } from "@/constants/enums";

interface QuestDetailProps {
  item: Quest;
}

const QuestDetail: React.FC<QuestDetailProps> = ({ item }) => {
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
        <Text style={styles.label}>Admin</Text>
        <View style={styles.row}>
            <View style={styles.assignee}>
              <Image
                source={getUserBodyIcon(item.owner.icon)}
                style={styles.character}
              />
              <Text style={styles.username}>{item.owner.username}</Text>
            </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Assignee(s)</Text>
        <View style={styles.row}>
          {item.adventurers && item.adventurers.map((adventurer) => (
            <View key={adventurer.$id} style={styles.assignee}>
              <Image
                source={getUserBodyIcon(adventurer.icon)}
                style={styles.character}
              />
              <Text style={styles.username}>{adventurer.username}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

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
  },
  date: {
    fontSize: 18,
    fontFamily: "ZCOOL",
    alignItems: 'center',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start", 
    marginBottom: 10,
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

export default QuestDetail;
