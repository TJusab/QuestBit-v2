import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import StatusButton from "./StatusButton";
import { getColorFromStatus, getColorFromDifficulty, getPointsFromDifficulty, getTextFromDates, getColorFromDates} from "@/utils/utils";
import { QuestBit } from "@/constants/types";
import { getUserBodyIcon } from "@/utils/icon";

interface QuestBitDetailProps {
  item: QuestBit;
}

const QuestBitDetail: React.FC<QuestBitDetailProps> = ({ item }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} pointerEvents="none">
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.row}>
        <StatusButton
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
      
      <View pointerEvents="none">
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
          <StatusButton
            color={getColorFromDifficulty(item.difficulty)}
            text={item.difficulty + "  |  " + getPointsFromDifficulty(item.difficulty) + "XP"}
            textStyle="text-sm"
          />
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginBottom: 15, marginTop: 15 }}></View>
      <View style={styles.section}>
        <Text style={styles.label}>Assignee(s)</Text>
        <View style={styles.row}>
          {item.assignees && item.assignees.map((assignee) => (
            <View key={assignee.$id} style={styles.assignee}>
              <Image
                source={getUserBodyIcon(assignee.icon)}
                style={styles.character}
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
          />
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
});

export default QuestBitDetail;
