import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { getQuestBitsForUser } from "../../lib/database";
import { getQuestColor } from "../../lib/icon";
import QuestBitCard from "../../components/QuestBitCard";
import Header from "../../components/Header";
import { QuestBit } from "../../constants/types";
import moment, { Moment } from "moment";

interface MarkedDate {
  dots: { color: string }[];
  selected?: boolean;
}

const CustomCalendar: React.FC = () => {
  const [questbits, setQuestBits] = useState<QuestBit[]>([]);
  const [markedDates, setMarkedDates] = useState<Record<string, MarkedDate>>(
    {}
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedQuestbits, setSelectedQuestbits] = useState<QuestBit[]>([]);

  useEffect(() => {
    // Simulated fetch from database
    const fetchQuestBits = async () => {
      try {
        const response = await getQuestBitsForUser();

        setQuestBits(response);
        const newMarkedDates: Record<string, MarkedDate> = {};

        response.forEach((questbit) => {
          if (questbit.dueDates && questbit.dueDates.length > 0) {
            const questColor = getQuestColor(questbit.quests.icon);
            const formattedDate = moment(questbit.dueDates[0]).format(
              "YYYY-MM-DD"
            );
            if (!newMarkedDates[formattedDate]) {
              newMarkedDates[formattedDate] = { dots: [] };
            }
            newMarkedDates[formattedDate].dots.push({ color: questColor });
          }
        });
        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.error("Error fetching quests:", error);
      }
    };

    fetchQuestBits();
  }, []);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    const questbitsForSelectedDate = questbits.filter((questbit) => {
      if (questbit.dueDates && questbit.dueDates.length > 0) {
        return moment(questbit.dueDates[0]).format("YYYY-MM-DD") === day.dateString;
      }
    });
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

  const renderCustomHeader = (date?: Date) => {
    if (!date) return null;

    const momentDate = moment(date.toISOString());
    const monthName = momentDate.format("MMMM yyyy");
    return (
      <View>
        <Text className="font-zcool text-xl py-5 text-navy">{monthName}</Text>
      </View>
    );
  };

  const handlePressArrowLeft = (subtractMonth: () => void) => {
    subtractMonth();
  };

  const handlePressArrowRight = (addMonth: () => void) => {
    addMonth();
  };

  return (
    <View>
      <Header header={"Calendar !"} />
      <View className="w-[90%] mx-auto p-5 rounded-xl bg-white border">
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
          onPressArrowLeft={handlePressArrowLeft}
          onPressArrowRight={handlePressArrowRight}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          onDayPress={handleDayPress}
          markingType={"multi-dot"}
          markedDates={{
            ...markedDates,
            [selectedDate || ""]: {
              ...markedDates[selectedDate || ""],
              selected: true,
            },
          }}
        />
      </View>
      <FlatList
        data={selectedQuestbits}
        keyExtractor={(questbit) => questbit.$id}
        renderItem={({ item }) => (
          <QuestBitCard item={item} />
        )}
      />
    </View>
  );
};

export default CustomCalendar;
