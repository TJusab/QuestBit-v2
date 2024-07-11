import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import PixelButton from "./PixelButton";
import { getIcons, getQuestIcon } from "../lib/icon";
import { Calendar } from "react-native-calendars";

const CalendarPopUp = ({ visible, onClose, onUpdate }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
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

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    onUpdate(day.dateString);
    onClose();
  };

  const renderCustomHeader = (date) => {
    const monthName = date.toString("MMMM yyyy");
    return (
      <View>
        <Text className="font-zcool text-xl py-5 text-navy">{monthName}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center">
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
          />
      </View>
    </Modal>
  );
};

export default CalendarPopUp;
