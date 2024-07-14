import React, { useEffect, useState } from "react";
import { View, Text, Modal } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

interface CalendarPopUpProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (date: string) => void;
}

const CalendarPopUp: React.FC<CalendarPopUpProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
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

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    onUpdate(day.dateString);
    onClose();
  };

  const renderCustomHeader = (date: Date) => {
    const monthName = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
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
