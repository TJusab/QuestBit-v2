import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { getQuestBits, getQuestBitsForUser, getQuests } from "../../lib/database";
import { getQuestColor } from "../../lib/icon";
import moment from "moment";
import QuestBit from "../../components/QuestBit";
import { globalStyles } from "../global_css";
import Header from "../../components/Header";

const CustomCalendar = () => {
  const [questbits, setQuestBits] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [selectedQuestbits, setSelectedQuestbits] = useState([]); // State to store selected questbits

  useEffect(() => {
    // Simulated fetch from database
    const fetchQuestBits = async () => {
      try {
        const response = await getQuestBitsForUser();

        setQuestBits(response);
        const newMarkedDates = {};

        response.forEach((questbit) => {
          const questColor = getQuestColor(questbit.quests.icon);
          const formattedDate = moment(questbit.dueDates[0]).format(
            "YYYY-MM-DD"
          );
          if (!newMarkedDates[formattedDate]) {
            newMarkedDates[formattedDate] = { dots: [] };
          }
          newMarkedDates[formattedDate].dots.push({ color: questColor });
        });
        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.error("Error fetching quests:", error);
      }
    };

    fetchQuestBits();
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const questbitsForSelectedDate = questbits
      .filter(
        (questbit) =>
          moment(questbit.dueDates[0]).format("YYYY-MM-DD") === day.dateString
      );
    setSelectedQuestbits(questbitsForSelectedDate);
  };

  const customTheme = {
    textMonthFontFamily: "ZCOOL",
    textDayFontFamily: "ZCOOL",
    textDayHeaderFontFamily: "ZCOOL",
    textSectionTitleColor: "#b6c1cd",
    todayTextColor: "#6abe30",
    selectedDayBackgroundColor: "#6abe30",
    arrowColor: "#2E3A59",
    dayTextColor: "#2E3A59",
    textMonthFontSize: 20,
    textDayFontSize: 16,
    textDayHeaderFontSize: 14,
  };

  const renderCustomHeader = (date) => {
    const monthName = date.toString("MMMM yyyy");
    return (
      <View>
        <Text className="font-zcool text-xl py-5 text-navy">{monthName}</Text>
      </View>
    );
  };

  const renderQuestBit = ({ item }) => <QuestBit item={item} />;

  return (
    <View>
      <Header header={"Calendar !"} />
      <View
        className="w-[90%] mx-auto rounded-xl bg-white"
        style={globalStyles.border}
      >
        <Calendar
          theme={customTheme}
          renderHeader={renderCustomHeader}
          monthFormat={"yyyy MM"}
          hideArrows={false}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          onDayPress={handleDayPress}
          markingType={"multi-dot"}
          markedDates={{
            ...markedDates,
            [selectedDate]: { ...markedDates[selectedDate], selected: true },
          }}
        />
      </View>
      <FlatList
        data={selectedQuestbits}
        keyExtractor={(questbit) => questbit.$id}
        renderItem={renderQuestBit}
      />
    </View>
  );
};

export default CustomCalendar;
